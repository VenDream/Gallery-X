/**
 * 底部导航栏器组件
 * @author VenDream
 * @since 2018-3-19
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { push } from 'react-router-redux';

import BottomBar from '../../components/bottom-bar';

function mapStateToProps(state: Record<string, any>) {
  const router = state.router;
  return {
    path: router.location.pathname,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction, {}>) {
  return {
    redirectTo: (path: string) => dispatch(push(path)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
