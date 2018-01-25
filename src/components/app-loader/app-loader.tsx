/**
 * 应用初始化加载蒙层
 * @author VenDream
 * @since 2018-1-24
 */

import React, { Component } from 'react';
import classnames from 'classnames';

import './app-loader.less';

interface AppLoaderProps {
  visible: boolean;
}

export default class AppLoader extends Component<AppLoaderProps> {
  render() {
    const loaderCls = classnames('app-loader', {
      inited: !this.props.visible,
    });

    return (
      <div className={loaderCls}>
        <span className="loader-icon">
          <i className="g-icon icon-loading" />
        </span>
        <span className="loader-text">少女祈祷中...</span>
      </div>
    );
  }
}
