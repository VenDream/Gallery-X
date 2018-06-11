/**
 * App状态同步
 * @author VenDream
 * @since 2018-5-11
 */

import moment from 'moment';
import { AnyAction } from 'redux';
import deepExtend from 'deep-extend';
import PAGE from '../constants/page';
import ACTIONS from '../constants/actions';
import CATEGORY from '../constants/category';
import RouterMap from '../constants/routers';

// 排行榜默认参数
const defaultRankingFilter: RankingIllustParams = {
  mode: 'day',
  date: moment()
    .subtract(1, 'days')
    .format('YYYY-MM-DD'),
  start: 0,
  step: 30,
};

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
    case ACTIONS.LOCATION_CHANGE: {
      const page = getTargetRoutePage(action.payload.pathname);
      const filter = page === PAGE.RANKING ? defaultRankingFilter : {};
      const category =
        page === PAGE.RANKING || page === PAGE.SEARCH ? page : '';

      return { ...state, page, filter, category };
    }
    default:
      return state;
  }
}
