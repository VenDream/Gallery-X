/**
 * 后端全局类型声明
 * @author VenDream
 * @since 2018-9-12
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
interface AppSession {
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

interface RankingParams {
  /**
   * 模式，按照日期，性取向和类型进行组合
   */
  mode?:
    | 'day'
    | 'week'
    | 'month'
    | 'day_male'
    | 'day_female'
    | 'week_original'
    | 'week_rookie'
    | 'day_r18'
    | 'day_male_r18'
    | 'day_female_r18'
    | 'week_r18'
    | 'week_r18g';
  /**
   * 日期，当模式组合为day前缀时生效
   */
  date?: string;
  /**
   * 偏移量
   */
  offset?: number;
  /**
   * 请求结果筛选目标
   */
  filter?: 'for_ios';
}

interface SearchParams {
  /**
   * 搜索关键词
   */
  word: string;
  /**
   * 搜索排序: 从新到旧，从旧到新或者按热度从高到低
   */
  sort?: 'date_desc' | 'date_asc' | 'popular_desc';
  /**
   * 搜索对象: 标签部分匹配，标签完全匹配或标题描述匹配
   */
  search_target?:
    | 'partial_match_for_tags'
    | 'exact_match_for_tags'
    | 'title_and_caption';
  /**
   * 起始日期(YYYY-MM-DD)
   */
  start_date?: string;
  /**
   * 终止日期(YYYY-MM-DD)
   */
  end_date?: string;
  /**
   * 偏移量
   */
  offset?: number;
  /**
   * 请求结果筛选目标
   */
  filter?: 'for_ios';
}
