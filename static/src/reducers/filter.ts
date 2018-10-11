/**
 * 筛选条件状态同步
 * @author VenDream
 * @since 2018-10-11
 */

import { AnyAction } from 'redux';
import ACTIONS from 'constants/actions';
import CATETORY from 'constants/category';
import { defaultRankingFilter, defaultSearchFilter } from './helpers/filter';

const initState: FilterState = {
  ranking: defaultRankingFilter,
  search: defaultSearchFilter,
};

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    // 切换路由时，还原所有筛选条件
    case ACTIONS.LOCATION_CHANGE: {
      return initState;
    }
    // 更新排行榜筛选条件
    case ACTIONS.UPDATE_RANKING_FILTER: {
      const { filter } = action.data;
      return {
        ...state,
        ranking: {
          ...state.ranking,
          ...(filter as RankingFilter),
        },
      };
    }
    // 更新搜索参数
    case ACTIONS.UPDATE_SEARCH_FILTER: {
      const { filter } = action.data;
      return {
        ...state,
        search: {
          ...state.search,
          ...(filter as SearchFilter),
        },
      };
    }
    // 获取数据成功，更新偏移位置
    case ACTIONS.GET_RANKING_ILLUST_END:
    case ACTIONS.GET_RANKING_ILLUST_SUCCESS:
    case ACTIONS.GET_SEARCH_ILLUST_END:
    case ACTIONS.GET_SEARCH_ILLUST_SUCCESS: {
      const { category, illusts } = action.data;
      const filterkey = category === CATETORY.RANKING ? 'ranking' : 'search';
      const oriFilter = state[filterkey];
      return {
        ...state,
        [filterkey]: {
          ...oriFilter,
          start: oriFilter.start + illusts.length,
        },
      };
    }
    default:
      return state;
  }
}
