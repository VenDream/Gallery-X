/**
 * 布局容器组件
 * @author VenDream
 * @since 2019-2-15
 */

import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';

import Layout from 'components/layout';
import { getConnectedCmp } from 'utils/connect';

interface OwnProps {}

function mapStateToProps(state: StoreState, ownProps: OwnProps) {
  return state.layout as LayoutState;
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {};
}

// withRouter传递路由状态
export default withRouter(
  getConnectedCmp(Layout, mapStateToProps, mapDispatchToProps)
);
