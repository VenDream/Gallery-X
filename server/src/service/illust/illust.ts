/**
 * 插画相关接口服务
 * @author VenDream
 * @since 2018-8-20
 */

import * as ajax from '../../utils/request';
import { getAuthHeaders } from '../../utils/common';

const apiHost = 'https://app-api.pixiv.net';

/**
 * 获取插画排行榜
 *
 * @export
 * @param {string} accessToken accessToken
 * @param {Record<string, any>} [params] 排行榜参数
 * @returns
 */
export function ranking(accessToken: string, params?: Record<string, any>) {
  const api = `${apiHost}/v1/illust/ranking`;
  const headers = getAuthHeaders(accessToken);

  return ajax.get(api, {
    headers,
    data: params || {},
  });
}
