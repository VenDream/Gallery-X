/**
 * 全局错误处理模块
 * @author VenDream
 * @since 2018-8-20
 */

import Router from 'koa-router';
import RESPONSE_CODE from '../constants/response-code';

export default function errorHandler() {
  return async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      const isDev = process.env.NODE_ENV === 'development';
      const { status, message } = err;
      ctx.body = {
        code: status || RESPONSE_CODE.FAILED,
        message: isDev ? message : '内部错误，服务暂不可用',
      };
    }
  };
}
