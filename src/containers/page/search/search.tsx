/**
 * search容器组件
 * @author VenDream
 * @since 2018-6-27
 */

import { connect } from 'react-redux';

import Search from 'components/page/search';

function mapStateToProps(state: StoreState) {
  return {
    filter: state.illust.searchFilter,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
