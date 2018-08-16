/**
 * 路由相关ACTION定义
 * @author VenDream
 * @since 2018-6-14
 */

import { AnyAction, Dispatch } from 'redux';
import { push } from 'react-router-redux';
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
