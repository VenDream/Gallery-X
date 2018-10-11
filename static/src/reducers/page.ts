/**
 * 页面状态同步
 * @author VenDream
 * @since 2018-10-11
 */

import { AnyAction } from 'redux';
import ACTIONS from 'constants/actions';
import { getUpdatedPageIllustIds } from './helpers/page';

const initState: PageState = {
  ranking: {
    illustIds: [],
  },
  search: {
    illustIds: [],
  },
};

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    // 切换路由时，清空所有数据
    case ACTIONS.LOCATION_CHANGE: {
      return initState;
    }
    // 更新排行榜参数时，清空原有数据
    case ACTIONS.UPDATE_RANKING_FILTER: {
      return {
        ...state,
        ranking: { illustIds: [] },
      };
    }
    // 更新搜索参数时，清空原有数据
    case ACTIONS.UPDATE_SEARCH_FILTER: {
      return {
        ...state,
        search: { illustIds: [] },
      };
    }
    // 请求排行榜数据成功时，添加对应的插画ID
    case ACTIONS.GET_RANKING_ILLUST_END:
    case ACTIONS.GET_RANKING_ILLUST_SUCCESS: {
      const illusts: IllustModel[] = action.data.illusts;
      const updatedIllustIds = getUpdatedPageIllustIds(
        state.ranking.illustIds,
        illusts
      );

      return {
        ...state,
        ranking: {
          illustIds: updatedIllustIds,
        },
      };
    }
    // 请求搜索数据成功时，添加对应的插画ID
    case ACTIONS.GET_SEARCH_ILLUST_END:
    case ACTIONS.GET_SEARCH_ILLUST_SUCCESS: {
      const illusts: IllustModel[] = action.data.illusts;
      const updatedIllustIds = getUpdatedPageIllustIds(
        state.search.illustIds,
        illusts
      );

      return {
        ...state,
        search: {
          illustIds: updatedIllustIds,
        },
      };
    }
    default:
      return state;
  }
}
