/**
 * 搜索框容器组件
 * @author VenDream
 * @since 2018-10-11
 */

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import SearchBox from 'components/search-box';
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
