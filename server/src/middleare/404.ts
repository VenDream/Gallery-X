/**
 * 全局404处理模块
 * @author VenDream
 * @since 2018-11-22
 */

import Router from 'koa-router';
import STATUS_CODE from '../constants/status-code';
import RESPONSE_CODE from '../constants/response-code';

export default function notFoundHandler() {
  return async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
    const { response } = ctx;
    if (response.status === STATUS_CODE.NOT_FOUND) {
      return (ctx.body = {
        code: RESPONSE_CODE.NOT_FOUND,
        msg: '┑(￣Д ￣)┍这里是火星，快回去地球吧',
      });
    }
    return next();
  };
}
