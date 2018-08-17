/**
 * 常用工具函数
 * @author VenDream
 * @since 2018-8-17
 */

import Router from 'koa-router';
import { AppSession } from 'lib.d';
import config from '../../../var/server.config.json';

/**
 * 通过key获取对应的session值
 *
 * @export
 * @param {Router.IRouterContext} ctx 上下文
 * @param {string} key session键，支持a.b.c
 */
export function getSessionByKey(ctx: Router.IRouterContext, key: string) {
  const session = ctx.session as AppSession;

  if (!key) return null;
  if (key.indexOf('.') < 0) return session[key] || null;

  const keys = key.split('.');
  const value = keys.reduce(
    (obj, k) => obj && (obj[k] === 0 ? 0 : obj[k] || null),
    session
  );

  return value;
}

/**
 * 获取Pixiv图片反向代理URL
 *
 * @export
 * @param {(string | string[])} urls 图片URL
 * @returns
 */
export function getProxyImageUrl(urls: string | string[]) {
  const isArrUrl = urls instanceof Array;
  const processUrls = isArrUrl ? (urls as string[]) : [urls as string];
  const proxiedUrls = [];

  for (let i = 0; i < processUrls.length; i += 1) {
    const url = processUrls[i];
    proxiedUrls[i] = `${config.proxyHost}?url=${url}`;
  }

  return isArrUrl ? proxiedUrls : proxiedUrls[0];
}

/**
 * 把图片对象的URL转换为反向代理URL
 *
 * @export
 * @param {Record<string, string>} obj 图片对象
 */
export function proxyImageObj(obj: Record<string, string>) {
  Object.entries(obj).map(([key, url]) => {
    obj[key] = getProxyImageUrl(url);
  });
  return obj;
}
