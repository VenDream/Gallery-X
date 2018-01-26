/**
 * 应用内容视图组件
 * @author VenDream
 * @since 2018-1-26
 */

import React, { Component } from 'react';

import './app-content.less';

interface AppContentProps {
  user: UserModel;
  getUserInfo: () => void;
}

export default class AppContent extends Component<AppContentProps> {
  async componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return <div className="app-content">APP 内容</div>;
  }
}
