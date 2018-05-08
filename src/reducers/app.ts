/**
 * App状态同步
 * @author VenDream
 * @since 2018-5-8
 */

import { AnyAction } from 'redux';
import deepExtend from 'deep-extend';
import PAGE from '../constants/page';
import ACTIONS from '../constants/actions';
import CATEGORY from '../constants/category';
import RouterMap from '../constants/routers';

const initState = {
  // 当前页面
  page: PAGE.INDEX,
  // 当前筛选条件
  filter: {},
  // 当前插画分类
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
      const category =
        page === PAGE.RANKING || page === PAGE.SEARCH ? page : '';

      return { ...state, filter: {}, page, category };
    }
    default:
      return state;
  }
}
