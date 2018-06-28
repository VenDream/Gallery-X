/**
 * profile容器组件
 * @author VenDream
 * @since 2018-6-14
 */

import { connect } from 'react-redux';

import Profile from 'components/page/profile';
import { logout } from 'actions/user';

function mapStateToProps(state: StoreState) {
  return {
    user: state.user as UserModel,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);