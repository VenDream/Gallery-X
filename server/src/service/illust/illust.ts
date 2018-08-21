/**
 * 插画相关接口服务
 * @author VenDream
 * @since 2018-8-21
 */

import * as ajax from '../../utils/request';
import { getAuthHeaders } from '../../utils/common';

const apiHost = 'https://app-api.pixiv.net';
const apiList = {
  ranking: '/v1/illust/ranking',
  search: '/v1/search/illust',
};

/**
 * 获取插画排行榜
 *
 * @export
 * @param {string} accessToken accessToken
 * @param {RankingParams} [params] 排行榜参数
 * @returns
 */
export function ranking(accessToken: string, params?: RankingParams) {
  const api = apiHost + apiList.ranking;
  const headers = getAuthHeaders(accessToken);

  return ajax.get(api, {
    headers,
    data: params || {},
  });
}

/**
 * 搜索相关插画
 *
 * @export
 * @param {string} accessToken accessToken
 * @param {SearchParams} [params] 搜索参数
 * @returns
 */
export function search(accessToken: string, params?: SearchParams) {
  const api = apiHost + apiList.search;
  const headers = getAuthHeaders(accessToken);

  return ajax.get(api, {
    headers,
    data: params || {},
  });
}
