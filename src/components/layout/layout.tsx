/**
 * 布局视图组件
 * @author VenDream
 * @since 2018-1-24
 */

import React, { Component } from 'react';
import AppLoader from '../app-loader';

interface LayoutProps {
  initLoadingVisible: boolean;
}

export default class Layout extends Component<LayoutProps> {
  render() {
    const { initLoadingVisible } = this.props;

    return <AppLoader initLoadingVisible={initLoadingVisible} />;
  }
}
