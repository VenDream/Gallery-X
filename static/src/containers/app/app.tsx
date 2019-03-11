/**
 * 应用顶级容器组件
 * @author VenDream
 * @since 2019-2-15
 */

import React, { SFC } from 'react';
import { withRouter } from 'react-router-dom';

import Layout from 'containers/layout';
import { getConnectedCmp } from 'utils/connect';

const App: SFC = () => {
  return <Layout />;
};

// withRouter传递路由状态
export default withRouter(getConnectedCmp(App));
