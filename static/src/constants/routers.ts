/**
 * 应用路由定义
 * @author VenDream
 * @since 2018-4-27
 */

import PAGE from './page';

// 路由对象定义
export interface Router {
  /**
   * 路径
   */
  path: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 图标
   */
  icon?: string;
}

const RouterMap: Record<string, Router> = {
  [PAGE.INDEX]: {
    path: '/',
    name: '首页',
    icon: 'home',
  },
  [PAGE.RANKING]: {
    path: '/ranking',
    name: '排行',
    icon: 'ranking',
  },
  [PAGE.SEARCH]: {
    path: '/search',
    name: '搜索',
    icon: 'search',
  },
  [PAGE.PROFILE]: {
    path: '/profile',
    name: '我的',
    icon: 'user',
  },
};

export default RouterMap;
