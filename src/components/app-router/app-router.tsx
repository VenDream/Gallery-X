/**
 * 全局路由控制器
 * @author VenDream
 * @since 2018-4-27
 */

import React from 'react';
import { Route } from 'react-router';
import { push } from 'react-router-redux';

import PAGE from '../../constants/page';
import RouterMap from '../../constants/routers';
import Home from '../home';
import Ranking from '../ranking';
import Search from '../search';
import Profile from '../../containers/profile';

export default () => (
  <div className="app-router">
    <Route exact={true} path={RouterMap[PAGE.INDEX].path} component={Home} />
    <Route path={RouterMap[PAGE.RANKING].path} component={Ranking} />
    <Route path={RouterMap[PAGE.SEARCH].path} component={Search} />
    <Route path={RouterMap[PAGE.PROFILE].path} component={Profile} />
  </div>
);
