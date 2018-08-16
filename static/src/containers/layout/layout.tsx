/**
 * 布局容器组件
 * @author VenDream
 * @since 2018-6-14
 */

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';

import Layout from 'components/layout';

interface OwnProps {}

function mapStateToProps(state: StoreState, ownProps: OwnProps) {
  const layout = state.layout as LayoutState;

  return state.layout as LayoutState;
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {};
}

// withRouter传递路由状态
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
