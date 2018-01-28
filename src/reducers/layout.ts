/**
 * 布局状态同步
 * @author VenDream
 * @since 2018-1-28
 */

import { AnyAction } from 'redux';
import ACTIONS from '../constants/actions';

export interface LayoutState {
  /**
   * 应用是否已初始化
   */
  inited: boolean;
  /**
   * 是否显示应用初始化的loading蒙层
   */
  initLoadingVisible: boolean;
}

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
