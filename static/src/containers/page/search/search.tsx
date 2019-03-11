/**
 * search容器组件
 * @author VenDream
 * @since 2019-2-15
 */

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Search from 'components/page/search';
import { getConnectedCmp } from 'utils/connect';

function mapStateToProps(state: StoreState) {
  return {};
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>
) {
  return {};
}

export default getConnectedCmp(Search, mapStateToProps, mapDispatchToProps);
