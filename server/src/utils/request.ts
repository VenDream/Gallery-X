/**
 * 全局request公用方法
 * @author VenDream
 * @since 2018-8-17
 */

import qs from 'qs';
import deepExtend from 'deep-extend';
import fetch, { BodyInit, Response } from 'node-fetch';

// 默认请求参数
const DEFAULT_OPTION: FetchOption = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  data: null,
  timeout: 10000,
};

/**
 * 通用请求方法
 *
 * @export
 * @param {string} url 请求URL
 * @param {FetchOption} [option] 请求参数
 * @returns
 */
export function request(url: string, option?: FetchOption) {
  const fetchOpt: FetchOption = deepExtend({}, DEFAULT_OPTION, option);
  const reqMethod = fetchOpt.method;
  const qsOpt = qs.stringify(fetchOpt.data);

  let body: BodyInit = null;
  // 根据method添加请求参数
  if (reqMethod === 'GET' && qsOpt) {
    // GET方法所有参数附在url上，body要置为null
    const linker = url.indexOf('?') > 0 ? '&' : '?';
    url += linker + qsOpt;
  } else if (reqMethod === 'POST') {
    // POST方法参数直接附在body上
    body = qsOpt;
  }

  const { data, ...opt } = fetchOpt;
  return fetch(url, { ...opt, body })
    .then((response: Response) => response.json())
    .then((res: Record<string, any>) => res)
    .catch(err => {
      console.error(err);
      return null;
    });
}

/**
 * get方法
 *
 * @export
 * @param {string} url 请求URL
 * @param {FetchOption} [option] 请求参数
 */
export function get(url: string, option?: FetchOption) {
  const fetchOpt: FetchOption = deepExtend({}, option, { method: 'GET' });
  return request(url, fetchOpt);
}

/**
 * post方法
 *
 * @export
 * @param {string} url 请求URL
 * @param {FetchOption} [option] 请求参数
 * @returns
 */
export function post(url: string, option?: FetchOption) {
  const fetchOpt: FetchOption = deepExtend({}, option, { method: 'POST' });
  return request(url, fetchOpt);
}
