/**
 * 布局视图组件
 * @author VenDream
 * @since 2018-1-26
 */

import React, { SFC } from 'react';
import AppLoader from '../app-loader';
import AppContent from '../../containers/app-content';

import './layout.less';

interface LayoutProps {
  initLoadingVisible: boolean;
}

const Layout: SFC<LayoutProps> = props => {
  const { initLoadingVisible } = props;

  return (
    <div className="g-layout">
      <AppLoader visible={initLoadingVisible} />
      <AppContent />
    </div>
  );
};

export default Layout;
