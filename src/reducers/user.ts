/**
 * 用户状态同步
 * @author VenDream
 * @since 2018-1-19
 */

import { AnyAction } from 'redux';
import ACTIONS from '../constants/actions';
import UserModelClass from '../models/user';

export type UserState = UserModel;

const initState: UserState = UserModelClass.create();

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case ACTIONS.TO_LOGIN: {
      console.log('to login');
      return state;
    }
    default:
      return state;
  }
}
