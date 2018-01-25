/**
 * 布局视图组件
 * @author VenDream
 * @since 2018-1-25
 */

import React, { SFC } from 'react';
import AppLoader from '../app-loader';

import './layout.less';

interface LayoutProps {
  initLoadingVisible: boolean;
}

const Layout: SFC<LayoutProps> = props => {
  const { initLoadingVisible } = props;

  return (
    <div className="g-layout">
      <AppLoader visible={initLoadingVisible} />
    </div>
  );
};

export default Layout;
