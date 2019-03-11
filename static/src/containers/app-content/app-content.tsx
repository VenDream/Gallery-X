/**
 * 应用内容容器组件
 * @author VenDream
 * @since 2019-2-15
 */

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter } from 'react-router-dom';

import { getUserInfo } from 'actions/user';
import { setInitLoadingVisible } from 'actions/layout';
import { getConnectedCmp } from 'utils/connect';
import AppContent from 'components/app-content';

interface OwnProps {}

function mapStateToProps(state: StoreState, ownProps: OwnProps) {
  return {
    inited: state.layout.inited,
    user: state.user as UserState,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>
) {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
    hideAppLoader: () => {
      setTimeout(() => {
        dispatch(setInitLoadingVisible(false));
      }, 500);
    },
  };
}

// withRouter传递路由状态
export default withRouter(
  getConnectedCmp(AppContent, mapStateToProps, mapDispatchToProps)
);
