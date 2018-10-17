/**
 * 全局ajax公用方法
 * @author VenDream
 * @since 2018-10-17
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
  isCancelable: false,
};

/**
 * 使promise可以取消
 * 参考：https://github.com/facebook/react/issues/5465#issuecomment-157888325
 *
 * @export
 * @param {Promise<any>} promise promise
 * @returns
 */
export function makeCancelable(promise: Promise<any>) {
  let hasCanceled = false;
  const wrappedPromise: Promise<any> = new Promise((resolve, reject) => {
    promise
      .then(val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)))
      .catch(err => (hasCanceled ? reject({ isCanceled: true }) : reject(err)));
  });
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
}

/**
 * 通用请求方法
 *
 * @export
 * @param {string} url 请求链接
 * @param {FetchOption} [options] 请求参数
 * @returns
 */
export function request(
  url: string,
  options?: FetchOption
): CancelablePromise | Promise<any> {
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

  const { raw, dataType, isCancelable, ...fetchOpt } = opt;
  const reqPromise = window
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

  return isCancelable ? makeCancelable(reqPromise) : reqPromise;
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
