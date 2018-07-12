/**
 * 登陆容器组件
 * @author VenDream
 * @since 2018-7-12
 */

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import LoginBox from 'components/login-box';
import { login } from 'actions/user';

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBox);
