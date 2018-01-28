/**
 * 用户相关ACTION定义
 * @author VenDream
 * @since 2018-1-28
 */

import { AnyAction, Dispatch } from 'redux';
import camelcaseKeys from 'camelcase-keys';
import ACTIONS from '../constants/actions';
import UserModelClass from '../models/user';
import * as ajax from '../utils/ajax';

/**
 * 获取用户信息
 *
 * @export
 * @returns
 */
export function getUserInfo() {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      const api = 'http://43.239.159.171:8080/api/get_user_info';
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
