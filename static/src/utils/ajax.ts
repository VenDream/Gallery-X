/**
 * 全局ajax公用方法
 * @author VenDream
 * @since 2018-8-14
 */

import qs from 'qs';
import 'isomorphic-fetch';
import ES6Promise from 'es6-promise';
import deepExtend from 'deep-extend';
import camelcaseKeys from 'camelcase-keys';

ES6Promise.polyfill();

// 默认的请求参数
const DEFAULT_OPTIONS: FetchOption = {
  mode: 'cors',
  method: 'GET',
  body: null,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  credentials: 'include',
  dataType: 'json',
  raw: false,
};

/**
 * 通用请求方法
 *
 * @export
 * @param {string} url 请求链接
 * @param {FetchOption} [options] 请求参数
 * @returns
 */
export function request(url: string, options?: FetchOption) {
  const opt: FetchOption = deepExtend({}, DEFAULT_OPTIONS, options);
  const reqMethod = opt.method;
  const qsOpt = qs.stringify(opt.body);

  if (reqMethod === 'GET' && qsOpt) {
    // GET方法所有参数附在url上，body要置为null
    const linker = url.indexOf('?') > 0 ? '&' : '?';
    url += linker + qsOpt;
    opt.body = null;
  } else if (reqMethod === 'POST') {
    // POST方法参数直接附在body上
    opt.body = qsOpt;
  }

  const { raw, dataType, ...fetchOpt } = opt;
  return window
    .fetch(url, fetchOpt)
    .then((response: Response) => response.json())
    .then((res: Record<string, any>) => {
      let result: Record<string, any>;
      // 非raw模式下，判断code为200后直接返回data
      if (!opt.raw && res.code === 200) {
        res = res.data || {};
      }
      // 统一把key都转为驼峰形式
      result = camelcaseKeys(res, { deep: true, exclude: [/_\d+/] });

      return result;
    })
    .catch(err => {
      console.error(err);
      return null;
    });
}

/**
 * Ajax.get方法
 *
 * @export
 * @param {string} url 请求链接
 * @param {FetchOption} [options] 请求参数
 * @returns
 */
export function get(url: string, options?: FetchOption) {
  const opt: FetchOption = deepExtend({}, options, { method: 'GET' });
  return request(url, opt);
}

/**
 * Ajax.post方法
 *
 * @export
 * @param {string} url 请求链接
 * @param {FetchOption} [options] 请求参数
 * @returns
 */
export function post(url: string, options?: FetchOption) {
  const opt: FetchOption = deepExtend({}, options, { method: 'POST' });
  return request(url, opt);
}
