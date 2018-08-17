/**
 * 后端全局类型声明
 * @author VenDream
 * @since 2018-8-16
 */

/// <reference path="../../lib.d.ts" />

type METHOD = 'GET' | 'POST';

// 请求参数对象
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

// session对象
export interface AppSession {
  /**
   * 用户信息
   */
  user?: UserModel;
  /**
   * 访问token
   */
  accessToken?: string;
  /**
   * 刷新token
   */
  refreshToken?: {
    /**
     * token
     */
    value: string;
    /**
     * 过期时间
     */
    expiredAt: Date;
  };
}
