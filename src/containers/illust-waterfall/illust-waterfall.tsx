/**
 * 插画瀑布流组件
 * @author VenDream
 * @since 2018-5-8
 */

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import CATEGORY from '../../constants/category';
import IllustWaterfall from '../../components/illust-waterfall';
import { getRankingIllusts } from '../../actions/illust';

function mapStateToProps(state: StoreState) {
  const app = state.app;
  const illust = state.illust;
  const illusts = illust.ids.map(id => illust.byId[id]);

  return {
    filter: app.filter,
    category: app.category,
    status: illust.status,
    illusts,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    // 获取插画数据（排行榜or搜索结果）
    fetchIllustData: (category: string, filter: RankingIllustParams) => {
      switch (category) {
        case CATEGORY.RANKING: {
          const opts = filter as RankingIllustParams;
          dispatch(getRankingIllusts(opts));
          break;
        }
        case CATEGORY.SEARCH:
        default:
          return;
      }
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IllustWaterfall);
