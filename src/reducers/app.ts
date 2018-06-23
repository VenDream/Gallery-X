/**
 * App状态同步
 * @author VenDream
 * @since 2018-6-23
 */

import moment from 'moment';
import { AnyAction } from 'redux';
import PAGE from 'constants/page';
import ACTIONS from 'constants/actions';
import RouterMap from 'constants/routers';

// 排行榜默认参数
const defaultRankingFilter: RankingIllustParams = (() => {
  const now = moment();
  const hours = moment().hours();
  // @NOTE：对于Pixiv来说，若当前时间处于早上11之前，取两天前数据，否则取一天前的数据
  const date = now.subtract(hours < 11 ? 2 : 1, 'days');

  return {
    mode: 'day',
    date: date.format('YYYY-MM-DD'),
    start: 0,
    step: 30,
  };
})();

const initState: AppState = {
  page: PAGE.INDEX,
  filter: {},
  category: '',
};

/**
 * 获取导航目标页
 *
 * @export
 * @param {string} pathname 路径
 * @returns
 */
export function getTargetRoutePage(pathname: string) {
  const targetRouter = Object.entries(RouterMap).filter(
    router => router[1].path === pathname
  );
  return (targetRouter.length && targetRouter[0][0]) || '';
}

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    /**
     * 切换路由
     */
    case ACTIONS.LOCATION_CHANGE: {
      const page = getTargetRoutePage(action.payload.pathname);
      const filter = page === PAGE.RANKING ? defaultRankingFilter : {};
      const category =
        page === PAGE.RANKING || page === PAGE.SEARCH ? page : '';

      return { ...state, page, filter, category };
    }

    /**
     * 更新filter
     */
    case ACTIONS.GET_RANKING_ILLUST_SUCCESS:
    case ACTIONS.GET_RANKING_ILLUST_END: {
      const illusts: IllustModel[] = action.data;
      return {
        ...state,
        filter: {
          ...state.filter,
          start: state.filter.start + illusts.length,
        },
      };
    }

    default:
      return state;
  }
}
