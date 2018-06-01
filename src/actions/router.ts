/**
 * 路由相关ACTION定义
 * @author VenDream
 * @since 2018-5-3
 */

import { AnyAction, Dispatch } from 'redux';
import { push } from 'react-router-redux';

import RouterMap, { Router } from '../constants/routers';
import ACTIONS from '../constants/actions';

/**
 * 切换页面
 *
 * @export
 * @param {string} path 页面路径
 */
export function redirectTo(path: string) {
  return (dispatch: Dispatch<AnyAction>, getState: any) => {
    // 触发react-router的重定向action
    dispatch(push(path));
  };
}
