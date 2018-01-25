/**
 * 应用顶级容器组件
 * @author VenDream
 * @since 2018-1-24
 */

import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Layout from '../layout';

const App: SFC = () => {
  return <Layout />;
};

export default connect()(App);
