/**
 * ACTION常量定义
 * @author VenDream
 * @since 2018-10-17
 */

export default {
  // 获取用户信息
  SET_USER_INFO: 'SET_USER_INFO',

  // 页面重定向
  LOCATION_CHANGE: '@@router/LOCATION_CHANGE',
  // 设置相关布局组件的显示状态
  SET_VISIBLE: 'SET_VISIBLE',

  // 添加插画
  ADD_ILLUST: 'ADD_ILLUST',
  // 添加艺术家
  ADD_ARTIST: 'ADD_ARTIST',

  // 获取插画排行榜
  UPDATE_RANKING_FILTER: 'UPDATE_RANKING_FILTER',
  GET_RANKING_ILLUST_ING: 'GET_RANKING_ILLUST_ING',
  GET_RANKING_ILLUST_SUCCESS: 'GET_RANKING_ILLUST_SUCCESS',
  GET_RANKING_ILLUST_FAIL: 'GET_RANKING_ILLUST_FAIL',
  GET_RANKING_ILLUST_END: 'GET_RANKING_ILLUST_END',

  // 获取插画搜索结果
  UPDATE_SEARCH_FILTER: 'UPDATE_SEARCH_FILTER',
  GET_SEARCH_ILLUST_ING: 'GET_SEARCH_ILLUST_ING',
  GET_SEARCH_ILLUST_SUCCESS: 'GET_SEARCH_ILLUST_SUCCESS',
  GET_SEARCH_ILLUST_FAIL: 'GET_SEARCH_ILLUST_FAIL',
  GET_SEARCH_ILLUST_END: 'GET_SEARCH_ILLUST_END',
};
