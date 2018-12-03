/**
 * 前端全局类型声明
 * @author VenDream
 * @since 2018-12-3
 */

/// <reference path="../../lib.d.ts" />
/// <reference path="./actions/actions.d.ts" />
/// <reference path="./reducers/reducer.d.ts" />
/// <reference types="@types/iscroll" />

type MODE = 'cors' | 'no-cors' | 'same-origin';
type DATA_TYPE = 'text' | 'json';
type METHOD = 'GET' | 'POST' | 'OPTION' | 'PUT';
type CREDENTIALS = 'omit' | 'same-origin' | 'include';

interface IllustSaveModel extends IllustBaseModel {
  /**
   * 插画作者ID
   */
  user: string;
}

interface FetchOption {
  /**
   * 跨域设置
   */
  mode?: MODE;
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
  /**
   * 是否支持取消请求
   */
  isCancelable?: boolean;
}

interface CancelablePromise {
  promise: Promise<any>;
  cancel(): void;
}

interface Window {
  __PIXIV_PROXY_HOST__: string;
  __GALLERY_X_GLOBAL_CONFIG__: Record<string, any>;
}

interface IScorllOptions2 extends IScrollOptions {
  /**
   * 减速因子
   */
  deceleration: number;
}
