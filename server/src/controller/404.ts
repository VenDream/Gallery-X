/**
 * 全局404处理模块
 * @author VenDream
 * @since 2018-8-16
 */

import Koa from 'koa';
import STATUS_CODE from '../constants/status-code';
import RESPONSE_CODE from '../constants/response-code';

export default function notFoundHandler() {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    const { response } = ctx;
    if (response.status === STATUS_CODE.NOT_FOUND) {
      ctx.body = {
        code: RESPONSE_CODE.NOT_FOUND,
        msg: '┑(￣Д ￣)┍这里是火星，快回去地球吧',
      };
    }
    return next();
  };
}
