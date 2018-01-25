/**
 * 布局容器组件
 * @author VenDream
 * @since 2018-1-25
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Layout from '../../components/layout';
import { LayoutState } from '../../reducers/layout';

interface OwnProps {}

function mapStateToProps(state: Record<string, any>, ownProps: OwnProps) {
  const layout = state.layout as LayoutState;

  return state.layout as LayoutState;
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
