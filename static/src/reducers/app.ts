/**
 * App状态同步
 * @author VenDream
 * @since 2018-12-7
 */

import { AnyAction } from 'redux';
import PAGE from 'constants/page';
import ACTIONS from 'constants/actions';
import RouterMap from 'constants/routers';

const initState: AppState = {
  page: PAGE.INDEX,
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
      const page = getTargetRoutePage(action.payload.location.pathname);
      const category =
        page === PAGE.RANKING || page === PAGE.SEARCH ? page : '';
      return { ...state, page, category };
    }

    default:
      return state;
  }
}
