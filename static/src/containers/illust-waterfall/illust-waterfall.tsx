/**
 * 插画瀑布流组件
 * @author VenDream
 * @since 2019-2-15
 */

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import CATEGORY from 'constants/category';
import { getConnectedCmp } from 'utils/connect';
import IllustWaterfall from 'components/illust-waterfall';
import { getRankingIllusts, getSearchIllusts } from 'actions/illust';

// 默认每次加载30条数据
const DEFAULT_LOADER_STEP = 30;

function mapStateToProps(state: StoreState, ownProps: Record<string, any>) {
  const { app, page, filter, illust } = state;
  const isRanking = app.category === CATEGORY.RANKING;
  const currFilter = isRanking ? filter.ranking : filter.search;
  const currIllustIds = isRanking
    ? page.ranking.illustIds
    : page.search.illustIds;
  const currIllusts = currIllustIds.map(id => illust.byId[id]);

  return {
    step: ownProps.step || DEFAULT_LOADER_STEP,
    filter: currFilter,
    category: app.category,
    status: illust.status,
    illusts: currIllusts,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>
) {
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

export default getConnectedCmp(
  IllustWaterfall,
  mapStateToProps,
  mapDispatchToProps
);
