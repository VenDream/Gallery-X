/**
 * 用户相关接口服务
 * @author VenDream
 * @since 2018-12-5
 */

import * as OAuthSvr from '../oauth';
import * as ajax from '../../utils/request';
import { getAuthHeaders } from '../../utils/common';

const apiHost = 'https://app-api.pixiv.net';
const apiList = {
  follow: '/v1/user/follow/add',
  unfollow: '/v1/user/follow/delete',
  illusts: '/v1/user/illusts',
  profileDetail: '/v1/user/detail',
};

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

/**
 * 关注用户
 *
 * @export
 * @param {string} accessToken accessToken
 * @param {string} userId 用户ID
 * @param {boolean} [isPrivate=false] 是否私人关注
 */
export function follow(
  accessToken: string,
  userId: string,
  isPrivate: boolean = false
) {
  const api = apiHost + apiList.follow;
  const headers = getAuthHeaders(accessToken);

  return ajax.post(api, {
    headers,
    data: { user_id: userId, restrict: isPrivate ? 'private' : 'public' },
  });
}

/**
 * 取关用户
 *
 * @export
 * @param {string} accessToken accessToken
 * @param {string} userId 用户ID
 */
export function unfollow(accessToken: string, userId: string) {
  const api = apiHost + apiList.unfollow;
  const headers = getAuthHeaders(accessToken);

  return ajax.post(api, {
    headers,
    data: { user_id: userId },
  });
}

/**
 * 获取用户近期作品
 *
 * @export
 * @param {string} accessToken accessToken
 * @param {string} userId 用户ID
 */
export function getUserIllusts(accessToken: string, userId: string) {
  const api = apiHost + apiList.illusts;
  const headers = getAuthHeaders(accessToken);

  return ajax.get(api, {
    headers,
    data: {
      type: 'illust',
      filter: 'for_ios',
      user_id: userId,
    },
  });
}

/**
 * 获取用户个人资料详情
 *
 * @export
 * @param {string} accessToken accessToken
 * @param {string} userId 用户ID
 * @returns
 */
export function getUserProfileDetail(accessToken: string, userId: string) {
  const api = apiHost + apiList.profileDetail;
  const headers = getAuthHeaders(accessToken);

  return ajax.get(api, {
    headers,
    data: {
      user_id: userId,
      filter: 'for_ios',
    },
  });
}
