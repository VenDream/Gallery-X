/**
 * 应用内容容器组件
 * @author VenDream
 * @since 2018-1-28
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

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

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
