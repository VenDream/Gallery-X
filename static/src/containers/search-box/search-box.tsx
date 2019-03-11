/**
 * 搜索框容器组件
 * @author VenDream
 * @since 2019-2-15
 */

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import SearchBox from 'components/search-box';
import { getConnectedCmp } from 'utils/connect';
import { updateSearchFilter } from 'actions/illust';

function mapStateToProps(state: StoreState) {
  return {
    filter: state.filter.search,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>
) {
  return {
    updateFilter: (patch: Partial<SearchFilter>) =>
      dispatch(updateSearchFilter(patch)),
  };
}

export default getConnectedCmp(SearchBox, mapStateToProps, mapDispatchToProps);
