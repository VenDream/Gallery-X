/**
 * search容器组件
 * @author VenDream
 * @since 2018-7-12
 */

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Search from 'components/page/search';

function mapStateToProps(state: StoreState) {
  return {};
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>
) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
