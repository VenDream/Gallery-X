// 路由对象定义
interface Router {
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

/**
 * 应用全局路由表
 */
const RouterMap: Record<string, Router> = {
  index: {
    path: '/',
    name: '首页',
    icon: 'home',
  },
  ranking: {
    path: '/ranking',
    name: '排行',
    icon: 'ranking',
  },
  search: {
    path: '/search',
    name: '搜索',
    icon: 'search',
  },
  profile: {
    path: '/profile',
    name: '我的',
    icon: 'user',
  },
};

export default RouterMap;
