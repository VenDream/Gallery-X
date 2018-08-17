/**
 * 应用内容容器组件
 * @author VenDream
 * @since 2018-7-12
 */

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter } from 'react-router-dom';

import { getUserInfo } from 'actions/user';
import { setInitLoadingVisible } from 'actions/layout';
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppContent)
);