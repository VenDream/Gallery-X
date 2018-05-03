/**
 * 底部导航栏组件
 * @author VenDream
 * @since 2018-4-27
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import BottomBar from '../../components/bottom-bar';
import { redirectTo } from '../../actions/router';

function mapStateToProps(state: Record<string, any>) {
  const router = state.router;
  return {
    path: router.location.pathname,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction, {}>) {
  return {
    redirectTo: (path: string) => dispatch(redirectTo(path)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
