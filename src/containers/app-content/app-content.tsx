/**
 * 应用内容容器组件
 * @author VenDream
 * @since 2018-1-26
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import { getUserInfo } from '../../actions/user';
import AppContent from '../../components/app-content';
import { UserState } from '../../reducers/user';

interface OwnProps {}

function mapStateToProps(state: Record<string, any>, ownProps: OwnProps) {
  return {
    user: state.user as UserState,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
