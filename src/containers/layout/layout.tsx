/**
 * 布局容器组件
 * @author VenDream
 * @since 2018-4-25
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Layout from '../../components/layout';
import { LayoutState } from '../../reducers/layout';

import { withRouter } from 'react-router-dom';

interface OwnProps {}

function mapStateToProps(state: Record<string, any>, ownProps: OwnProps) {
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
