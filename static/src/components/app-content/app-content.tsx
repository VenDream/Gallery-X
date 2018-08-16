/**
 * 应用内容视图组件
 * @author VenDream
 * @since 2018-6-14
 */

import React, { Component } from 'react';

import AppRouter from 'components/app-router';
import LoginBox from 'containers/login-box';
import BottomBar from 'containers/bottom-bar/bottom-bar';

import './app-content.less';

interface AppContentProps {
  inited: boolean;
  user: UserModel;
  getUserInfo: () => void;
  hideAppLoader: () => void;
}

export default class AppContent extends Component<AppContentProps> {
  componentDidMount() {
    this.props.getUserInfo();
  }

  componentDidUpdate(prevProps: AppContentProps) {
    // 初始化完毕，隐藏app-loader
    if (!prevProps.inited && this.props.inited) {
      this.props.hideAppLoader();
    }
  }

  render() {
    const user = this.props.user;

    return user.id ? (
      <div className="app-content">
        <AppRouter />
        <BottomBar />
      </div>
    ) : (
      <LoginBox />
    );
  }
}
