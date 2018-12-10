/**
 * 用户相关接口
 * @author VenDream
 * @since 2018-12-10
 */

import API from './index';
import * as ajax from 'utils/ajax';

/**
 * 获取该用户的近期作品
 *
 * @export
 * @param {string} userId 用户ID
 */
export function getUserIllusts(userId: string) {
  const api = API.get('USER_ILLUSTS');
  return ajax.get(api, { body: { userId }, isCancelable: true });
}

/**
 * 获取用户个人资料详情
 *
 * @export
 * @param {string} userId 用户ID
 * @returns
 */
export function getUserProfileDetail(userId: string) {
  const api = API.get('USER_PROFILE_DETAIL');
  return ajax.get(api, { body: { userId } });
}

/**
 * 关注用户
 *
 * @export
 * @param {string} userId 用户ID
 * @param {boolean} [isPrivate=false] 是否私人关注
 */
export function follow(userId: string, isPrivate: boolean = false) {
  const api = API.get('USER_FOLLOW');
  return ajax.post(api, { body: { userId, isPrivate }, raw: true });
}

/**
 * 取消关注用户
 *
 * @export
 * @param {string} userId 用户ID
 */
export function unfollow(userId: string) {
  const api = API.get('USER_UNFOLLOW');
  return ajax.post(api, { body: { userId }, raw: true });
}
