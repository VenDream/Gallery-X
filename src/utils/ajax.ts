/**
 * 全局ajax组件
 * @author VenDream
 * @since 2018-3-9
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
  body?: Record<string, any> | string;
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
  }

  return (window as any).fetch(url, opt).then(
    async response => {
      if (response.ok) {
        if (opt.dataType === 'text') {
          return response.text();
        } else if (opt.dataType === 'json') {
          const jsonRes: Record<string, any> = await response.json();
          // 预处理返回结果，如果检测到code为200，则返回data值
          if (jsonRes.code === 200) {
            return typeof jsonRes.data === 'string'
              ? jsonRes.data
              : camelcaseKeys(jsonRes.data || {});
          }
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
