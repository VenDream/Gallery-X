/**
 * 布局容器组件
 * @author VenDream
 * @since 2018-1-24
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Layout from '../../components/layout';
import { LayoutState } from '../../reducers/layout';

function mapStateToProps(state: Record<string, any>) {
  const layout = state.layout as LayoutState;

  return state.layout as LayoutState;
}

export default connect(mapStateToProps, null)(Layout);
