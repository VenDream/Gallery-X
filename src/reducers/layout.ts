/**
 * 布局状态同步
 * @author VenDream
 * @since 2018-1-24
 */

import { AnyAction } from 'redux';
import ACTIONS from '../constants/actions';

export interface LayoutState {
  /**
   * 是否显示应用初始化的loading蒙层
   */
  initLoadingVisible: boolean;
}

const initState: LayoutState = {
  initLoadingVisible: true,
};

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case ACTIONS.SET_VISIBLE: {
      return { ...state, ...action.data };
    }
    default:
      return state;
  }
}
