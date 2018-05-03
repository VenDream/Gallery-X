/**
 * 插画瀑布流组件
 * @author VenDream
 * @since 2018-4-27
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import IllustWaterfall from '../../components/illust-waterfall';

function mapStateToProps(state: Record<string, any>) {
  const app = state.app;
  const illust = state.illust;
  const illusts = illust.ids.map(id => illust.byId[id]);

  return {
    category: app.category,
    status: illust.status,
    illusts,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction, {}>) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(IllustWaterfall);
