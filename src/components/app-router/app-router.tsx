/**
 * 全局路由控制器
 * @author VenDream
 * @since 2018-4-25
 */

import React from 'react';
import { Route } from 'react-router';
import { push } from 'react-router-redux';

import RouterMap from '../../constants/routers';
import Home from '../home';
import Profile from '../../containers/profile';

export default () => (
  <div className="app-router">
    <Route exact={true} path={RouterMap.index.path} component={Home} />
    <Route path={RouterMap.ranking.path} component={Profile} />
    <Route path={RouterMap.search.path} component={Profile} />
    <Route path={RouterMap.profile.path} component={Profile} />
  </div>
);
