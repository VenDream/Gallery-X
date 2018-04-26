/**
 * profile容器组件
 * @author VenDream
 * @since 2018-4-25
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Profile from '../../components/profile/profile';
import { logout } from '../../actions/user';

function mapStateToProps(state: Record<string, any>) {
  return {
    user: state.user as UserModel,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction, {}>) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);