/**
 * App状态同步
 * @author VenDream
 * @since 2018-5-3
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
  // 当前插画分类
  category: '',
};

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case ACTIONS.LOCATION_CHANGE: {
      const { pathname } = action.payload;
      const targetRouter = Object.entries(RouterMap).filter(
        router => router[1].path === pathname
      );
      const page = targetRouter.length && targetRouter[0][0];
      const category =
        page === PAGE.RANKING || page === PAGE.SEARCH ? page : '';

      return { ...state, page, category };
    }
    default:
      return state;
  }
}
