/**
 * 全局ajax公用方法
 * @author VenDream
 * @since 2018-5-8
 */

import 'whatwg-fetch';
import qs from 'qs';
import deepExtend from 'deep-extend';
import camelcaseKeys from 'camelcase-keys';

type DATA_TYPE = 'text' | 'json';
type METHOD = 'GET' | 'POST' | 'OPTION' | 'PUT';
type CREDENTIALS = 'omit' | 'same-origin' | 'include';

interface FetchOption {
  /**
   * 请求Method
   */
  method?: METHOD;
  /**
   * 请求数据
   */
  body?: Record<string, any> | string | null;
  /**
   * 请求头
   */
  headers?: Record<string, any>;
  /**
   * 认证模式，与cookies相关
   *  omit => 不携带cookies
   *  same-origin => 同源请求携带cookies，跨域请求不携带
   *  include => 所有请求(包括跨域请求)均携带cookies
   */
  credentials?: CREDENTIALS;
  /**
   * 返回的数据类型
   */
  dataType?: DATA_TYPE;
  /**
   * 是否返回原始数据
   */
  raw?: boolean;
}

// 默认的请求参数
const DEFAULT_OPTIONS: FetchOption = {
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
 * 通用的请求方法
 *
 * @param {string} url 请求API链接
 * @param {FetchOption} options 请求参数
 * @returns
 */
export function request(url: string, options?: FetchOption) {
  const opt: FetchOption = deepExtend({}, DEFAULT_OPTIONS, options);
  if (opt.body) {
    opt.body = qs.stringify(opt.body);
    !opt.body && (opt.body = null);
  }

  return (window as any).fetch(url, opt).then(
    async response => {
      if (response.ok) {
        if (opt.dataType === 'text') {
          return response.text();
        } else if (opt.dataType === 'json') {
          let jsonRes: Record<string, any> = await response.json();

          // 非raw模式下，判断code为200后直接返回data
          if (!opt.raw && jsonRes.code === 200) {
            jsonRes = jsonRes.data || {};
          }

          return typeof jsonRes === 'string'
            ? jsonRes
            : camelcaseKeys(jsonRes, { deep: true, exclude: [/_\d+/] });
        }
      } else {
        const error: Record<string, any> = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      console.log(error);
    }
  );
}

/**
 * Ajax.get方法
 *
 * @param {any} url 请求API链接
 * @param {FetchOption} options 请求参数
 * @returns
 */
export function get(url, options?: FetchOption) {
  const opt: FetchOption = deepExtend({}, options, { method: 'GET' });
  return request(url, opt);
}

/**
 * Ajax.post方法
 *
 * @param {any} url 请求API链接
 * @param {FetchOption} options 请求参数
 * @returns
 */
export function post(url, options?: FetchOption) {
  const opt: FetchOption = deepExtend({}, options, { method: 'POST' });
  return request(url, opt);
}
