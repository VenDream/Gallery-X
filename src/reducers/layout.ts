/**
 * 布局状态同步
 * @author VenDream
 * @since 2018-6-14
 */

import { AnyAction } from 'redux';
import ACTIONS from 'constants/actions';

const initState: LayoutState = {
  inited: false,
  initLoadingVisible: true,
};

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case ACTIONS.SET_USER_INFO: {
      return { ...state, inited: true };
    }
    case ACTIONS.SET_VISIBLE: {
      return { ...state, ...action.data };
    }
    default:
      return state;
  }
}
