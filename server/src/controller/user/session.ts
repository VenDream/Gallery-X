/**
 * 用户相关session操作模块
 * @author VenDream
 * @since 2018-8-17
 */

import Router from 'koa-router';
import { AppSession } from 'lib.d';
import { proxyImageObj } from '../../utils/common';
import { getDateAfterSeconds } from '../../utils/date';

/**
 * 设置session
 *
 * @param {Router.IRouterContext} ctx 上下文
 * @param {Record<string, any>} userResp 请求结果
 * @returns
 */
export function setUserSession(
  ctx: Router.IRouterContext,
  userResp: Record<string, any>
) {
  const user = userResp.user as UserModel;
  if (user) {
    const session = ctx.session as AppSession;

    // 头像图片反向代理
    proxyImageObj(user.profileImageUrls);
    // 设置用户相关session
    session.user = user;
    session.accessToken = userResp.accessToken;
    session.refreshToken = {
      value: userResp.refreshToken,
      expiredAt: getDateAfterSeconds(userResp.expiresIn),
    };

    return true;
  }
  return false;
}

/**
 * 清除session
 *
 * @param {Router.IRouterContext} ctx 上下文
 */
export function clearUserSession(ctx: Router.IRouterContext) {
  const session = ctx.session as AppSession;
  // 清除session
  delete session.user;
  delete session.accessToken;
  delete session.refreshToken;

  return true;
}
