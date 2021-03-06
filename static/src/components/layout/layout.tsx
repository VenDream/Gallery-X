/**
 * 布局视图组件
 * @author VenDream
 * @since 2018-6-28
 */

import React, { SFC } from 'react';
import AppLoader from 'components/app-loader';
import AppContent from 'containers/app-content';

import './layout.less';

interface LayoutProps {
  initLoadingVisible: boolean;
}

const Layout: SFC<LayoutProps> = props => {
  const { initLoadingVisible } = props;

  return (
    <div className="g-layout">
      <AppContent />
      <AppLoader visible={initLoadingVisible} />
    </div>
  );
};

export default Layout;
