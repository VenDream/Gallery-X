/**
 * 底部导航栏组件
 * @author VenDream
 * @since 2018-6-14
 */

import { connect } from 'react-redux';

import BottomBar from 'components/bottom-bar';
import { redirectTo } from 'actions/router';
import { RouterState } from 'react-router-redux';

function mapStateToProps(state: StoreState & { router: RouterState }) {
  const router = state.router;
  return {
    path: router.location.pathname,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    redirectTo: (path: string) => dispatch(redirectTo(path)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomBar);
