/**
 * 登陆容器组件
 * @author VenDream
 * @since 2018-6-14
 */

import { connect } from 'react-redux';

import LoginBox from 'components/login-box/login-box';
import { login } from 'actions/user';

function mapStateToProps(state: StoreState) {
  return {
    user: state.user as UserState,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    login: (data: LoginParams) => dispatch(login(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBox);
