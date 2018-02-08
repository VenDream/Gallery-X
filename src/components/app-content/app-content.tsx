/**
 * 应用内容视图组件
 * @author VenDream
 * @since 2018-1-28
 */

import React, { Component } from 'react';

import LoginBox from '../../containers/login-box';
import BottomBar from '../bottom-bar';
import './app-content.less';

interface AppContentProps {
  inited: boolean;
  user: UserModel;
  getUserInfo: () => Promise<void>;
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

    return (
      <div className="app-content">
        {user.id ? <BottomBar /> : <LoginBox />}
      </div>
    );
  }
}
