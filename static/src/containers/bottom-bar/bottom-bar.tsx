/**
 * 底部导航栏组件
 * @author VenDream
 * @since 2019-2-15
 */

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import BottomBar from 'components/bottom-bar';
import { redirectTo } from 'actions/router';
import { getConnectedCmp } from 'utils/connect';
import { RouterState } from 'connected-react-router';

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

export default getConnectedCmp(BottomBar, mapStateToProps, mapDispatchToProps);
