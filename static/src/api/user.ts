/**
 * 用户相关接口
 * @author VenDream
 * @since 2018-12-27
 */

import API from './index';
import * as ajax from 'utils/ajax';

/**
 * 获取用户插画作品
 *
 * @export
 * @param {string} userId 用户ID
 * @param {number} [start=0] 偏移值
 * @param {number} [step=30] 获取记录数
 * @returns
 */
export function getUserIllusts(
  userId: string,
  start: number = 0,
  step: number = 30
) {
  const api = API.get('USER_ILLUSTS');
  return ajax.get(api, { body: { start, step, userId }, isCancelable: true });
}

/**
 * 获取用户漫画作品
 *
 * @export
 * @param {string} userId 用户ID
 * @param {number} [start=0] 偏移值
 * @param {number} [step=30] 获取记录数
 * @returns
 */
export function getUserMangas(
  userId: string,
  start: number = 0,
  step: number = 30
) {
  const api = API.get('USER_MANGAS');
  return ajax.get(api, { body: { start, step, userId } });
}

/**
 * 获取用户收藏插画
 *
 * @export
 * @param {string} userId 用户ID
 * @param {number} [step=30] 获取记录数
 * @param {string} [maxBookmarkId] 下一页分页参数
 * @returns
 */
export function getUserBookmarkIllusts(
  userId: string,
  step: number = 30,
  maxBookmarkId: string = ''
) {
  const api = API.get('USER_BOOKMARK_ILLUSTS');
  const body = { step, userId };
  maxBookmarkId && (body['maxBookmarkId'] = maxBookmarkId);

  return ajax.get(api, { body });
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
