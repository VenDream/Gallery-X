/**
 * 搜索框容器组件
 * @author VenDream
 * @since 2018-7-12
 */

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import SearchBox from 'components/search-box';
import { updateSearchFilter } from 'actions/illust';

function mapStateToProps(state: StoreState) {
  return {
    filter: state.illust.searchFilter,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>
) {
  return {
    updateFilter: (patch: Record<string, any>) =>
      dispatch(updateSearchFilter(patch)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
