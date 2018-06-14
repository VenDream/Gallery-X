/**
 * 应用初始化加载蒙层
 * @author VenDream
 * @since 2018-6-14
 */

import React, { Component } from 'react';

import './app-loader.less';

interface AppLoaderProps {
  visible: boolean;
}

export default class AppLoader extends Component<AppLoaderProps> {
  render() {
    return this.props.visible ? (
      <div className="app-loader">
        <span className="loader-icon">
          <i className="g-icon icon-loading" />
        </span>
        <span className="loader-text">少女祈祷中...</span>
      </div>
    ) : null;
  }
}
