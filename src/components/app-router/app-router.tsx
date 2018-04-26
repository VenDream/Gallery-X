/**
 * 全局路由控制器
 * @author VenDream
 * @since 2018-4-26
 */

import React from 'react';
import { Route } from 'react-router';
import { push } from 'react-router-redux';

import RouterMap from '../../constants/routers';
import Home from '../home';
import Ranking from '../ranking';
import Search from '../search';
import Profile from '../../containers/profile';

export default () => (
  <div className="app-router">
    <Route exact={true} path={RouterMap.index.path} component={Home} />
    <Route path={RouterMap.ranking.path} component={Ranking} />
    <Route path={RouterMap.search.path} component={Search} />
    <Route path={RouterMap.profile.path} component={Profile} />
  </div>
);
