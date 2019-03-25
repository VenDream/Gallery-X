/**
 * 插画状态同步
 * @author VenDream
 * @since 2019-3-25
 */

import { AnyAction } from 'redux';
import ACTIONS from 'constants/actions';
import { getLikeToggleState, getUpdatedIllusts } from './helpers/illust';

const initState: IllustState = {
  byId: {},
  ids: [],
  activeId: '',
  status: 0,
};

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    // 正在获取
    case ACTIONS.GET_RANKING_ILLUST_ING:
    case ACTIONS.GET_SEARCH_ILLUST_ING: {
      return { ...state, status: 1 };
    }
    // 获取失败
    case ACTIONS.GET_RANKING_ILLUST_FAIL:
    case ACTIONS.GET_SEARCH_ILLUST_FAIL: {
      return { ...state, status: 2 };
    }
    // 获取成功 & 添加插画
    case ACTIONS.ADD_ILLUST:
    case ACTIONS.GET_RANKING_ILLUST_SUCCESS:
    case ACTIONS.GET_SEARCH_ILLUST_SUCCESS: {
      const illusts: IllustModel[] = action.data.illusts;
      const updatedIllusts = getUpdatedIllusts(illusts, state);
      return {
        ...state,
        ...updatedIllusts,
        status: 0,
      };
    }
    // 获取完毕
    case ACTIONS.GET_RANKING_ILLUST_END:
    case ACTIONS.GET_SEARCH_ILLUST_END: {
      const illusts: IllustModel[] = action.data.illusts;
      const updatedIllusts = getUpdatedIllusts(illusts, state);
      return {
        ...state,
        ...updatedIllusts,
        status: 3,
      };
    }
    // 收藏插画
    case ACTIONS.LIKE_ILLUST: {
      const { illustId } = action.data;
      return getLikeToggleState(illustId, state, true);
    }
    // 取消收藏插画
    case ACTIONS.UNLIKE_ILLUST: {
      const { illustId } = action.data;
      return getLikeToggleState(illustId, state, false);
    }
    // 设置当前正在查看的插画
    case ACTIONS.SET_ACTIVE_ILLUST: {
      const { illustId } = action.data;
      return {
        ...state,
        activeId: illustId,
      };
    }
    default:
      return state;
  }
}
