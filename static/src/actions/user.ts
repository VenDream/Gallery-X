/**
 * 用户相关ACTION定义
 * @author VenDream
 * @since 2018-10-17
 */

import { AnyAction, Dispatch } from 'redux';
import { push } from 'react-router-redux';

import ACTIONS from 'constants/actions';
import MESSAGE from 'constants/message';
import RouterMap from 'constants/routers';
import UserModelClass from 'models/user';
import Message from 'components/common/message';
import API from 'api';
import * as ajax from 'utils/ajax';

/**
 * 获取用户信息
 *
 * @export
 * @returns
 */
export function getUserInfo() {
  return async (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    try {
      const api = API.get('USER_INFO');
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
  return async (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    try {
      const api = API.get('USER_LOGIN');

      dispatch({
        type: ACTIONS.SET_USER_INFO,
        data: { isLoading: true },
      });

      const res: Record<string, any> = await ajax.post(api, {
        body: { username: data.account, password: data.password },
        raw: true,
      });

      let payload: Record<string, any> = { isLoading: false };

      if (+res.code === 200 && res.data) {
        payload = { ...payload, ...res.data };
        Message.show({
          type: 2,
          message: `欢迎回来，${(payload as UserModel).name}`,
          duration: 2000,
        });
      } else {
        payload = { ...payload, message: res.message || MESSAGE.LOGIN_FAILED };
      }

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
  return async (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    try {
      const api = API.get('USER_LOGOUT');
      const res = await ajax.post(api, { raw: true });
      if (res.code === 200) {
        const guest = UserModelClass.create();
        Message.show({
          type: 2,
          message: '登出成功',
          duration: 2000,
        });

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

/**
 * 关注用户
 *
 * @export
 * @param {string} userId 用户ID
 * @returns
 */
export function follow(userId: string) {
  return (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    dispatch({ type: ACTIONS.FOLLOW_USER, data: { userId } });
  };
}

/**
 * 取消关注用户
 *
 * @export
 * @param {string} userId 用户ID
 * @returns
 */
export function unfollow(userId: string) {
  return (dispatch: Dispatch<AnyAction>, getState: () => StoreState) => {
    dispatch({ type: ACTIONS.UNFOLLOW_USER, data: { userId } });
  };
}
