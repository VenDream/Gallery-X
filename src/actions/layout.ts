/**
 * 布局相关ACTION定义
 * @author VenDream
 * @since 2018-6-14
 */

import { AnyAction, Dispatch } from 'redux';
import ACTIONS from 'constants/actions';

/**
 * 同步显示/隐藏初始加载蒙层
 *
 * @export
 * @param {boolean} visible 是否显示
 * @returns
 */
export function setInitLoadingVisible(visible: boolean) {
  return (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    dispatch({
      type: ACTIONS.SET_VISIBLE,
      data: {
        initLoadingVisible: visible,
      },
    });
  };
}
