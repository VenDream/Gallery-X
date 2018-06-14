/**
 * 用户状态同步
 * @author VenDream
 * @since 2018-6-14
 */

import { AnyAction } from 'redux';
import deepExtend from 'deep-extend';
import ACTIONS from 'constants/actions';
import UserModelClass from 'models/user';

const initState: UserState = {
  ...UserModelClass.create(),
  isLoading: false,
};

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case ACTIONS.SET_USER_INFO: {
      return deepExtend({}, state, action.data);
    }
    default:
      return state;
  }
}
