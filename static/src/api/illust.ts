/**
 * 插画相关接口
 * @author VenDream
 * @since 2018-11-26
 */

import API from './index';
import * as ajax from 'utils/ajax';

/**
 * 收藏插画
 *
 * @export
 * @param {string} illustId 插画ID
 * @param {boolean} [isPrivate=false] 是否私人收藏
 */
export function like(illustId: string, isPrivate: boolean = false) {
  const api = API.get('ILLUST_LIKE');
  return ajax.post(api, { body: { illustId, isPrivate }, raw: true });
}

/**
 * 取消收藏插画
 *
 * @export
 * @param {string} illustId 插画ID
 */
export function unlike(illustId: string) {
  const api = API.get('ILLUST_UNLIKE');
  return ajax.post(api, { body: { illustId }, raw: true });
}
