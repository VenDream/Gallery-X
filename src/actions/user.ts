/**
 * 用户相关ACTION定义
 * @author VenDream
 * @since 2018-4-27
 */

import { AnyAction, Dispatch } from 'redux';
import { push } from 'react-router-redux';
import camelcaseKeys from 'camelcase-keys';

import ACTIONS from '../constants/actions';
import MESSAGE from '../constants/message';
import RouterMap from '../constants/routers';
import UserModelClass from '../models/user';
import Message from '../components/common/message';
import API from '../api';
import * as ajax from '../utils/ajax';

// Pixiv登陆参数定义
export interface LoginParams {
  /**
   * 账号（PixivID或邮箱）
   */
  account: string;
  /**
   * 密码
   */
  password: string;
}

/**
 * 获取用户信息
 *
 * @export
 * @returns
 */
export function getUserInfo() {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      const api = API.get('GET_USER_INFO');
      const user = await ajax.get(api);
      dispatch({
        type: ACTIONS.SET_USER_INFO,
        data: user,
      });
    } catch (e) {
      console.error(e);
      const guest = UserModelClass.create();
      Message.show({ type: 3, message: MESSAGE.GET_USER_INFO_FAILED });
      dispatch({
        type: ACTIONS.SET_USER_INFO,
        data: guest,
      });
    }
  };
}

/**
 * 用户登陆
 *
 * @export
 * @param {LoginParams} data 登录参数
 * @returns
 */
export function login(data: LoginParams) {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      const api = API.get('LOGIN');

      dispatch({
        type: ACTIONS.SET_USER_INFO,
        data: { isLoading: true },
      });

      const res: Record<string, any> = await ajax.post(api, {
        body: { username: data.account, password: data.password },
        raw: true,
      });

      let payload: Record<string, any> = { isLoading: false };
      payload =
        res.code === 200 && res.data
          ? { ...payload, ...res.data }
          : { ...payload, message: res.message || MESSAGE.LOGIN_FAILED };

      dispatch({
        type: ACTIONS.SET_USER_INFO,
        data: payload,
      });
    } catch (e) {
      console.error(e);
      Message.show({ type: 3, message: MESSAGE.LOGIN_FAILED });
    }
  };
}

/**
 * 用户登出
 *
 * @export
 * @returns
 */
export function logout() {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      const api = API.get('LOGOUT');
      const res = await ajax.post(api, { raw: true });
      if (res.code === 200) {
        const guest = UserModelClass.create();

        // 退出登陆，回到首页
        dispatch(push(RouterMap.index.path));
        dispatch({
          type: ACTIONS.SET_USER_INFO,
          data: guest,
        });
      }
    } catch (e) {
      console.error(e);
      Message.show({ type: 3, message: MESSAGE.LOGOUT_FAILED });
    }
  };
}
