/**
 * 后端全局类型声明
 * @author VenDream
 * @since 2018-8-16
 */

/// <reference path="../../lib.d.ts" />

type METHOD = 'GET' | 'POST';

interface FetchOption {
  /**
   * 请求method
   */
  method?: METHOD;
  /**
   * 请求头
   */
  headers?: Record<string, any>;
  /**
   * 请求数据
   */
  data?: Record<string, any>;
  /**
   * 请求超时时间
   */
  timeout?: number;
}
