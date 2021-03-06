/**
 * 插画相关ACTION定义
 * @author VenDream
 * @since 2019-3-25
 */

import { AnyAction, Dispatch } from 'redux';
import API from 'api';
import * as ajax from 'utils/ajax';
import ACTIONS from 'constants/actions';
import MESSAGE from 'constants/message';
import CATEGORY from 'constants/category';
import Message from 'components/common/message';
import { defaultSearchFilter } from 'reducers/helpers/filter';

/**
 * 更新排行榜筛选条件
 *
 * @export
 * @param {Partial<RankingFilter>} patch 更新补丁
 */
export function updateRankingFilter(patch: Partial<RankingFilter>) {
  return (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    // 更换筛选条件时，start从0开始
    patch.start = 0;
    dispatch({ type: ACTIONS.UPDATE_RANKING_FILTER, data: { filter: patch } });
  };
}

/**
 * 获取插画排行榜
 *
 * @export
 * @param {RankingFilter} opts 查询参数
 */
export function getRankingIllusts(opts?: RankingFilter) {
  return async (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    try {
      // 请求数据中
      dispatch({ type: ACTIONS.GET_RANKING_ILLUST_ING });

      const api = API.get('ILLUST_RANKING');
      const resp = await ajax.get(api, { body: opts });
      const type = resp.isEnd
        ? ACTIONS.GET_RANKING_ILLUST_END
        : ACTIONS.GET_RANKING_ILLUST_SUCCESS;

      // 请求成功or请求完毕
      dispatch({
        type,
        data: {
          category: CATEGORY.RANKING,
          illusts: resp.illusts,
        },
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: ACTIONS.GET_RANKING_ILLUST_FAIL });
      Message.show({ type: 3, message: MESSAGE.GET_RANKING_ILLUSTS_FAILED });
    }
  };
}

/**
 * 更新搜索参数
 *
 * @export
 * @param {Partial<SearchFilter>} patch 更新补丁
 */
export function updateSearchFilter(patch: Partial<SearchFilter>) {
  return (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    // 更换筛选条件时，start从0开始
    patch.start = 0;
    dispatch({ type: ACTIONS.UPDATE_SEARCH_FILTER, data: { filter: patch } });
  };
}

/**
 * 获取插画搜索结果
 *
 * @export
 * @param {SearchFilter} opts 查询参数
 */
export function getSearchIllusts(opts: SearchFilter) {
  return async (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    if (!opts.word) return;
    try {
      // 请求数据中
      dispatch({ type: ACTIONS.GET_SEARCH_ILLUST_ING });

      const api = API.get('ILLUST_SEARCH');
      const resp = await ajax.get(api, { body: opts });
      const type = resp.isEnd
        ? ACTIONS.GET_SEARCH_ILLUST_END
        : ACTIONS.GET_SEARCH_ILLUST_SUCCESS;

      // 请求成功or请求完毕
      dispatch({
        type,
        data: {
          category: CATEGORY.SEARCH,
          illusts: resp.illusts,
        },
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: ACTIONS.GET_SEARCH_ILLUST_FAIL });
      Message.show({ type: 3, message: MESSAGE.GET_SEARCH_ILLUSTS_FAILED });
    }
  };
}

/**
 * 添加插画
 *
 * @export
 * @param {IllustModel[]} illusts 插画
 */
export function addIllust(illusts: IllustModel[]) {
  return (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    dispatch({ type: ACTIONS.ADD_ILLUST, data: { illusts } });
  };
}

/**
 * 同步添加插画，store可以直接dispatch
 *
 * @export
 * @param {IllustModel[]} illusts 插画
 */
export function addIllustSync(illusts: IllustModel[]) {
  return { type: ACTIONS.ADD_ILLUST, data: { illusts } };
}

/**
 * 同步设置当前正在查看的插画
 *
 * @export
 * @param {string} illustId 插画ID
 * @returns
 */
export function setActiveIllustSync(illustId: string) {
  return { type: ACTIONS.SET_ACTIVE_ILLUST, data: { illustId } };
}

/**
 * 收藏插画
 *
 * @export
 * @param {string} illustId 插画ID
 */
export function like(illustId: string) {
  return (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    dispatch({ type: ACTIONS.LIKE_ILLUST, data: { illustId } });
  };
}

/**
 * 取消收藏插画
 *
 * @export
 * @param {string} illustId 插画ID
 */
export function unlike(illustId: string) {
  return (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    dispatch({ type: ACTIONS.UNLIKE_ILLUST, data: { illustId } });
  };
}

/**
 * 通过标签搜索插画
 *
 * @export
 * @param {string} tag 标签
 */
export function searchByTag(tag: string) {
  return (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    // 把标签作为关键词，其他均为默认
    const patch = { ...defaultSearchFilter, word: tag };
    dispatch({ type: ACTIONS.UPDATE_SEARCH_FILTER, data: { filter: patch } });
  };
}
