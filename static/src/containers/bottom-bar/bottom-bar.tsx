/**
 * 底部导航栏组件
 * @author VenDream
 * @since 2018-7-12
 */

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import BottomBar from 'components/bottom-bar';
import { redirectTo } from 'actions/router';
import { RouterState } from 'react-router-redux';

function mapStateToProps(state: StoreState & { router: RouterState }) {
  const router = state.router;
  return {
    path: router.location.pathname,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>
) {
  return {
    redirectTo: (path: string) => dispatch(redirectTo(path)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomBar);
