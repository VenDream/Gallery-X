/**
 * 登陆容器组件
 * @author VenDream
 * @since 2018-2-8
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import LoginBox from '../../components/login-box';
import { login, LoginParams } from '../../actions/user';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    login: (data: LoginParams) => dispatch(login(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
