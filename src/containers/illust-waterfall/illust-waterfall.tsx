/**
 * 插画瀑布流组件
 * @author VenDream
 * @since 2018-7-12
 */

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import CATEGORY from 'constants/category';
import IllustWaterfall from 'components/illust-waterfall';
import { getRankingIllusts, getSearchIllusts } from 'actions/illust';

// 默认每次加载30条数据
const DEFAULT_LOADER_STEP = 30;

function mapStateToProps(state: StoreState, ownProps: Record<string, any>) {
  const app = state.app;
  const illust = state.illust;
  const illusts = illust.ids.map(id => illust.byId[id]);
  const filter =
    app.category === CATEGORY.RANKING
      ? illust.rankingFilter
      : illust.searchFilter;

  return {
    step: ownProps.step || DEFAULT_LOADER_STEP,
    filter,
    category: app.category,
    status: illust.status,
    illusts,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IllustWaterfall);
