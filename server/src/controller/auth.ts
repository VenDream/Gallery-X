/**
 * 授权相关工具函数
 * @author VenDream
 * @since 2018-8-21
 */

import Router from 'koa-router';
import * as UserSvr from '../service/user';
import { handlePixivResp } from '../utils/response';
import { setUserSession } from './user/session';

/**
 * 获取accessToken，过期会自动刷新
 *
 * @export
 * @param {Router.IRouterContext} ctx 请求上下文
 * @returns
 */
export async function getAccessToken(
  ctx: Router.IRouterContext
): Promise<string> {
  const session = ctx.session as AppSession;
  const { accessToken, refreshToken } = session;

  if (!accessToken || !refreshToken) return '';

  const hasExpired = new Date(refreshToken.expiredAt) <= new Date();
  // 口令已过期，重新获取
  if (hasExpired) {
    try {
      const refreshResp = await UserSvr.getUserInfo(refreshToken.value);
      const resp: Record<string, any> = handlePixivResp(refreshResp);
      const isRefreshSucceed = setUserSession(ctx, resp);
      return isRefreshSucceed ? resp.accessToken : '';
    } catch (err) {
      throw new Error((err && err.message) || err);
    }
  } else {
    // 口令有效，继续使用
    return accessToken;
  }
}
