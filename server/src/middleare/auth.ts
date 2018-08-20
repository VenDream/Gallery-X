/**
 * 全局授权校验处理模块
 * @author VenDream
 * @since 2018-8-20
 */

import Router from 'koa-router';
import RESPONSE_CODE from '../constants/response-code';

// 需要授权调用的接口规则(除了登录和获取用户信息之外的接口)
const authNeededRule = /^\/api\/(?!user\/(login|info))/;

export default function checkUserAuth() {
  return async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
    const path = ctx.request.path;
    const session = ctx.session as AppSession;
    const isAuthNeededApi = authNeededRule.test(path);
    const hasUserSession = session.user && session.user.id;

    // 无授权访问，返回错误消息
    if (isAuthNeededApi && !hasUserSession) {
      ctx.body = {
        code: RESPONSE_CODE.NOT_LOGINED,
        msg: '请先登录',
      };
    } else {
      return next();
    }
  };
}
