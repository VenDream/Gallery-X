/**
 * 插画瀑布流组件
 * @author VenDream
 * @since 2018-6-26
 */

import { connect } from 'react-redux';

import CATEGORY from 'constants/category';
import IllustWaterfall from 'components/illust-waterfall';
import { getRankingIllusts, getSearchIllusts } from 'actions/illust';

function mapStateToProps(state: StoreState) {
  const app = state.app;
  const illust = state.illust;
  const illusts = illust.ids.map(id => illust.byId[id]);
  const filter =
    app.category === CATEGORY.RANKING
      ? illust.rankingFilter
      : illust.searchFilter;

  return {
    filter,
    category: app.category,
    status: illust.status,
    illusts,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    // 获取插画数据（排行榜or搜索结果）
    fetchIllustData: (
      category: string,
      filter: RankingFilter | SearchFilter
    ) => {
      switch (category) {
        case CATEGORY.RANKING: {
          const opts = filter as RankingFilter;
          dispatch(getRankingIllusts(opts));
          break;
        }
        case CATEGORY.SEARCH: {
          const opts = filter as SearchFilter;
          dispatch(getSearchIllusts(opts));
          break;
        }
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
