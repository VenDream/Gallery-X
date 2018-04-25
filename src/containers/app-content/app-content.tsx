/**
 * 应用内容容器组件
 * @author VenDream
 * @since 2018-4-25
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { withRouter } from 'react-router-dom';

import { getUserInfo } from '../../actions/user';
import { setInitLoadingVisible } from '../../actions/layout';
import AppContent from '../../components/app-content';
import { UserState } from '../../reducers/user';

interface OwnProps {}

function mapStateToProps(state: Record<string, any>, ownProps: OwnProps) {
  return {
    inited: state.layout.inited,
    user: state.user as UserState,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction, {}>) {
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
  connect(mapStateToProps, mapDispatchToProps)(AppContent)
);
