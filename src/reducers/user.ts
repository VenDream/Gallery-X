/**
 * 用户状态同步
 * @author VenDream
 * @since 2018-1-26
 */

import { AnyAction } from 'redux';
import deepExtend from 'deep-extend';
import ACTIONS from '../constants/actions';
import UserModelClass from '../models/user';

export type UserState = UserModel;

const initState: UserState = UserModelClass.create();

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case ACTIONS.SET_USER_INFO: {
      return deepExtend({}, state, action.data);
    }
    default:
      return state;
  }
}
