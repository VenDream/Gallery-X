/**
 * 缓存中间件，用于缓存更新频率低且请求耗时长的接口
 *
 * @author VenDream
 * @since 2018-12-18
 * @note 假设默认的响应格式都为application/json
 */

import Router from 'koa-router';
import Redis from 'ioredis';
import pathToRegExp from 'path-to-regexp';

import { md5 } from '../utils/crypto';
import { appLogger } from '../utils/logger';
import { getDateTimeInfo } from '../utils/date';
import RESPONSE_CODE from '../constants/response-code';

// 每日排行API，需要缓存一天
const RANKING_API = '/api/illust/ranking';

// 缓存配置，暂时不开放给外部
export const cacheConfig = {
  // 全局缓存有效时长(1小时)
  expire: 60 * 60,
  // 需要跳过缓存时传递的参数
  bypassParam: 'noCache',
  // redis缓存key前缀
  prefix: 'GALLERY_X_API',
  // redis配置
  redis: { host: process.env.REDIS_HOST || '127.0.0.1', port: 6379 },
  // 需要匹配的路由
  routes: [RANKING_API, '/api/user/illusts', '/api/illust/search'],
};

// 创建redis客户端实例
export const redisClient = (() => {
  const redisConfig = cacheConfig.redis;
  const { host, port } = redisConfig;
  return new Redis({ host, port });
})();

/**
 * 判断请求路径是否匹配指定路由
 *
 * @param {string} route 路由
 * @param {string} path 请求路径
 * @returns
 */
function isMatch(route: string, path: string) {
  return pathToRegExp(route, [], { sensitive: true, strict: true }).test(path);
}

/**
 * 判断是否为需要缓存的路由
 *
 * @param {string} path 请求path
 */
function isTargetRoute(path: string) {
  const { routes } = cacheConfig;
  for (const route of routes) {
    if (isMatch(route, path)) {
      return true;
    }
  }
  return false;
}

export default function cache() {
  return async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
    const { path, url, query } = ctx.request;
    const session = ctx.session as AppSession;
    const userId = (session.user && session.user.id) || 'guest';
    const { expire, prefix, bypassParam } = cacheConfig;
    const key = `${prefix}_${userId}_${md5(url)}`;
    let shouldHaveCache = isTargetRoute(path);
    const bypass = query[bypassParam] === 'true' || +query[bypassParam] === 1;

    // 请求到达时，判断是否需要查询缓存
    if (shouldHaveCache && !bypass) {
      const cacheResStr = await redisClient.get(key);
      if (cacheResStr) {
        appLogger.info('Hit Redis cache...');
        try {
          const cacheRes: ApiCacheItem = JSON.parse(cacheResStr);
          ctx.response.status = RESPONSE_CODE.SUCCESS;
          ctx.response.set('X-Koa-Redis-Cache', 'true');
          ctx.response.type = 'application/json';
          return (ctx.response.body = cacheRes.responseBody);
        } catch (err) {
          appLogger.error(err);
        }
      }
    }

    await next();

    const { method } = ctx.request;
    const { body } = ctx.response;
    shouldHaveCache = isTargetRoute(path);
    // 请求远程服务得到结果时，缓存结果
    if (
      !bypass &&
      shouldHaveCache &&
      method === 'GET' &&
      body.code === RESPONSE_CODE.SUCCESS
    ) {
      let cacheExpire = expire;
      // 排行榜API在每日的11.AM更新，所以在10:00-11:00发起的请求，需要保证缓存在11:00时失效
      const { timePart, timeStamp } = getDateTimeInfo();
      const { YY, MM, DD, HH } = timePart;
      if (path === RANKING_API && HH === 10) {
        const destDate = new Date(YY, MM - 1, DD, 11, 0, 0);
        const timeDiff = destDate.getTime() - timeStamp;
        cacheExpire = Math.ceil(timeDiff / 1000);
      }

      try {
        const cacheItem: ApiCacheItem = {
          requestUrl: url,
          responseBody: body,
        };
        await redisClient.setex(key, cacheExpire, JSON.stringify(cacheItem));
      } catch (err) {
        appLogger.error(err);
      }
    }
  };
}
