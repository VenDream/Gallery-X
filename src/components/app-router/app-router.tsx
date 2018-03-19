/**
 * 全局路由控制器
 * @author VenDream
 * @since 2018-3-19
 */

import React from 'react';
import { Route } from 'react-router';
import { push } from 'react-router-redux';

import Home from '../home';

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
  icon: string;
}

/**
 * 路由表
 */
export const RouterMap: Record<string, Router> = {
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

export default () => (
  <div className="app-router">
    <Route exact={true} path={RouterMap.index.path} component={Home} />
    <Route path={RouterMap.ranking.path} component={Home} />
    <Route path={RouterMap.search.path} component={Home} />
    <Route path={RouterMap.profile.path} component={Home} />
  </div>
);
