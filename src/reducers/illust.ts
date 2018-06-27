/**
 * 插画状态同步
 * @author VenDream
 * @since 2018-6-27
 */

import { AnyAction } from 'redux';
import ACTIONS from 'constants/actions';
import CATEGORY from 'constants/category';
import { defaultRankingFilter, defaultSearchFilter } from './filter';

const initState: IllustState = {
  byId: {},
  ids: [],
  activeId: '',
  status: 0,
  rankingFilter: defaultRankingFilter,
  searchFilter: defaultSearchFilter,
};

/**
 * 获取更新后的filter
 *
 * @param {string} category 当前插画分类
 * @param {IllustState} state 插画state
 * @param {number} offset 偏移量
 */
function getUpdatedFilter(
  category: string,
  state: IllustState,
  offset: number
) {
  const filter =
    category === CATEGORY.RANKING ? state.rankingFilter : state.searchFilter;
  return {
    ...filter,
    start: filter.start + offset,
  };
}

/**
 * 获取更新后的illusts
 *
 * @param {IllustModel[]} illusts 传入的illusts
 * @param {IllustState} state 插画state
 * @returns
 */
function getUpdatedIllusts(illusts: IllustModel[], state: IllustState) {
  const ids = [];
  const byId = {};
  for (const illust of illusts) {
    ids.push(illust.id);
    byId[illust.id] = illust;
  }
  return { byId: { ...state.byId, ...byId }, ids: [...state.ids, ...ids] };
}

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case ACTIONS.LOCATION_CHANGE: {
      return initState;
    }

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

    // 获取成功
    case ACTIONS.GET_RANKING_ILLUST_SUCCESS:
    case ACTIONS.GET_SEARCH_ILLUST_SUCCESS: {
      const { category, illusts } = action.data;
      const updatedFilter = getUpdatedFilter(category, state, illusts.length);
      const updatedIllusts = getUpdatedIllusts(illusts, state);
      return {
        ...state,
        ...updatedIllusts,
        rankingFilter: updatedFilter,
        status: 0,
      };
    }

    // 获取完毕
    case ACTIONS.GET_RANKING_ILLUST_END:
    case ACTIONS.GET_SEARCH_ILLUST_END: {
      const { category, illusts } = action.data;
      const updatedFilter = getUpdatedFilter(category, state, illusts.length);
      const updatedIllusts = getUpdatedIllusts(illusts, state);
      return {
        ...state,
        ...updatedIllusts,
        searchFilter: updatedFilter,
        status: 3,
      };
    }

    // 更新筛选条件
    case ACTIONS.UPDATE_RANKING_FILTER: {
      const { filter } = action.data;
      return {
        ...initState,
        rankingFilter: {
          ...state.rankingFilter,
          ...filter,
        },
      };
    }
    case ACTIONS.UPDATE_SEARCH_FILTER: {
      const { filter } = action.data;
      return {
        ...initState,
        searchFilter: {
          ...state.searchFilter,
          ...filter,
        },
      };
    }
    default:
      return state;
  }
}
