/**
 * 登陆容器组件
 * @author VenDream
 * @since 2019-2-15
 */

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { login } from 'actions/user';
import LoginBox from 'components/login-box';
import { getConnectedCmp } from 'utils/connect';

function mapStateToProps(state: StoreState) {
  return {
    user: state.user as UserState,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>
) {
  return {
    login: (data: LoginParams) => dispatch(login(data)),
  };
}

export default getConnectedCmp(LoginBox, mapStateToProps, mapDispatchToProps);
