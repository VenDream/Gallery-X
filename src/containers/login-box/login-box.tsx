/**
 * 登陆容器组件
 * @author VenDream
 * @since 2018-3-19
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import LoginBox from '../../components/login-box/login-box';
import { login, LoginParams } from '../../actions/user';
import { UserState } from '../../reducers/user';

function mapStateToProps(state: Record<string, any>) {
  return {
    user: state.user as UserState,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    login: (data: LoginParams) => dispatch(login(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
