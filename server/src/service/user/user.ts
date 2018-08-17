/**
 * 用户相关接口服务
 * @author VenDream
 * @since 2018-8-17
 */

import * as OAuthSvr from '../oauth';

/**
 * 用户登录
 *
 * @export
 * @param {string} username 用户名
 * @param {string} password 用户密码
 * @returns
 */
export function login(username: string, password: string) {
  return OAuthSvr.login(username, password);
}

/**
 * 获取用户信息
 *
 * @export
 * @param {string} token 刷新token
 * @returns
 */
export function getUserInfo(token: string) {
  return OAuthSvr.refresh(token);
}
