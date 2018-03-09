/**
 * 用户相关ACTION定义
 * @author VenDream
 * @since 2018-2-8
 */

import { AnyAction, Dispatch } from 'redux';
import camelcaseKeys from 'camelcase-keys';
import ACTIONS from '../constants/actions';
import UserModelClass from '../models/user';
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
      let user: UserModel = await ajax.get(api);
      if (!user || !user.id) {
        user = UserModelClass.create();
      }

      dispatch({
        type: ACTIONS.SET_USER_INFO,
        data: user,
      });
    } catch (e) {
      console.error(e);
      const guest = UserModelClass.create();
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
      const user: UserModel = await ajax.post(api, {
        body: { username: data.account, password: data.password },
      });

      if (!user || !user.id) {
        console.log('登陆失败');
        return;
      }

      dispatch({
        type: ACTIONS.SET_USER_INFO,
        data: user,
      });
    } catch (e) {
      console.error(e);
    }
  };
}
