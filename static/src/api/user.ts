/**
 * 用户相关接口
 * @author VenDream
 * @since 2018-10-17
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
