/**
 * 应用首页
 * @author VenDream
 * @since 2018-3-19
 */

import React, { Component } from 'react';

import './home.less';

interface HomeProps {}

export default class Home extends Component<HomeProps> {
  render() {
    return <div className="home">首页</div>;
  }
}
