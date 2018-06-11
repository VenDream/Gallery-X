/**
 * 插画状态同步
 * @author VenDream
 * @since 2018-5-8
 */

import { AnyAction } from 'redux';
import ACTIONS from '../constants/actions';

// 扁平化的illust状态
const initState: IllustState = {
  byId: {},
  ids: [],
  activeId: '',
  status: 0,
};

/**
 * 获取扩展后的插画数据对象
 *
 * @param {IllustModel[]} illusts 插画数据集
 */
function getExtendedIllusts(
  illusts: IllustModel[],
  state: Record<string, any>
) {
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
    case ACTIONS.GET_RANKING_ILLUST_ING: {
      return { ...state, status: 1 };
    }
    case ACTIONS.GET_RANKING_ILLUST_FAIL: {
      return { ...state, status: 2 };
    }
    case ACTIONS.GET_RANKING_ILLUST_SUCCESS: {
      const extendedIllusts = getExtendedIllusts(action.data, state);
      return { ...state, ...extendedIllusts, status: 0 };
    }
    case ACTIONS.GET_RANKING_ILLUST_END: {
      const extendedIllusts = getExtendedIllusts(action.data, state);
      return { ...state, ...extendedIllusts, status: 3 };
    }
    default:
      return state;
  }
}
