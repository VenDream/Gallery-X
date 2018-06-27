/**
 * 搜索框容器组件
 * @author VenDream
 * @since 2018-6-27
 */

import { connect } from 'react-redux';

import SearchBox from 'components/search-box';
import { updateSearchFilter } from 'actions/illust';

function mapStateToProps(state: StoreState) {
  return {
    filter: state.illust.searchFilter,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateFilter: (patch: Record<string, any>) =>
      dispatch(updateSearchFilter(patch)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
