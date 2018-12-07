/**
 * 路由相关ACTION定义
 * @author VenDream
 * @since 2018-12-7
 */

import { AnyAction, Dispatch } from 'redux';
import { push } from 'connected-react-router';
/**
 * 切换页面
 *
 * @export
 * @param {string} path 页面路径
 */
export function redirectTo(path: string) {
  return (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    // 触发react-router的重定向action
    dispatch(push(path));
  };
}
