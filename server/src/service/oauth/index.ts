/**
 * OAuth认证模块
 * @author VenDream
 * @since 2018-8-17
 */

import deepExtend from 'deep-extend';
import { post } from '../../utils/request';
import Headers from '../../constants/headers';

// 认证接口
const OAUTH_URL = 'https://oauth.secure.pixiv.net/auth/token';
// 用户登录参数
const LOGIN_PARAMS: Record<string, any> = {
  client_secret: 'W9JZoJe00qPvJsiyCGT3CCtC6ZUtdpKpzMbNlUGP',
  client_id: 'KzEZED7aC0vird8jWyHM38mXjNTY',
  get_secure_url: true,
  device_token: 'b05975d061900127ac5a333ad4a14e06',
  grant_type: 'password',
};
// 用户信息刷新参数
const REFRESH_PARAMS: Record<string, any> = deepExtend({}, LOGIN_PARAMS, {
  grant_type: 'refresh_token',
});

/**
 * 用户登录
 *
 * @export
 * @param {string} username 用户名
 * @param {string} password 用户密码
 */
export function login(username: string, password: string) {
  const loginParams: Record<string, any> = deepExtend({}, LOGIN_PARAMS, {
    username,
    password,
  });
  return post(OAUTH_URL, { headers: Headers.app, data: loginParams });
}

/**
 * 用户信息刷新
 *
 * @export
 * @param {string} token 刷新token
 */
export function refresh(token: string) {
  const refreshParams: Record<string, any> = deepExtend({}, REFRESH_PARAMS, {
    refresh_token: token,
  });
  return post(OAUTH_URL, { headers: Headers.app, data: refreshParams });
}
