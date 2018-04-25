/**
 * 应用顶级容器组件
 * @author VenDream
 * @since 2018-4-25
 */

import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { withRouter } from 'react-router-dom';

import Layout from '../layout';

const App: SFC = () => {
  return <Layout />;
};

// withRouter传递路由状态
export default withRouter(connect()(App));
