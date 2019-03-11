/**
 * profile容器组件
 * @author VenDream
 * @since 2019-2-15
 */

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Profile from 'components/page/profile';
import { logout } from 'actions/user';
import { getConnectedCmp } from 'utils/connect';

function mapStateToProps(state: StoreState) {
  return {
    user: state.user as UserModel,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>
) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default getConnectedCmp(Profile, mapStateToProps, mapDispatchToProps);
