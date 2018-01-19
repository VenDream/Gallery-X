/**
 * 用户状态同步
 * @author VenDream
 * @since 2018-1-19
 */

import { AnyAction } from 'redux';
import ACTIONS from '../constants/actions';

export type UserState = UserModel;

const initState: UserState = {
  id: '',
  account: '',
  name: '游客',
  xRestrict: -1,
  mailAddress: '',
  isPremium: false,
  isMailAuthorized: false,
  profileImageUrls: null,
};

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case ACTIONS.TO_LOGIN: {
      return state;
    }
    default:
      return state;
  }
}
