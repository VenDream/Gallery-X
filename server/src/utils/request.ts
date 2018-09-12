/**
 * 全局request公用方法
 * @author VenDream
 * @since 2018-8-23
 */

import qs from 'qs';
import deepExtend from 'deep-extend';
import camelCaseKeys from 'camelcase-keys';
import fetch, { BodyInit, Response } from 'node-fetch';
import { httpLogger } from '../utils/logger';

const isDev = process.env.NODE_ENV === 'development';

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
export function request(
  url: string,
  option?: FetchOption
): Record<string, any> {
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

  httpLogger.info('请求接口地址:\n', url);
  httpLogger.info('请求参数:\n', JSON.stringify(fetchOpt));
  const { data, ...opt } = fetchOpt;
  return fetch(url, { ...opt, body })
    .then((response: Response) => response.json())
    .then((res: Record<string, any>) => {
      const result = camelCaseKeys(res, {
        deep: true,
        exclude: [/_\d+/],
      });
      // 开发环境打印请求响应数据
      isDev && httpLogger.info('接口响应数据:\n', JSON.stringify(result));
      return result;
    })
    .catch(err => {
      const errMsg = (err && err.message) || err;
      httpLogger.error(errMsg);
      throw new Error(errMsg);
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
