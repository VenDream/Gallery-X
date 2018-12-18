/**
 * 应用首页
 * @author VenDream
 * @since 2018-6-26
 */

import React, { Component } from 'react';

import './home.less';

interface HomeProps {}

export default class Home extends Component<HomeProps> {
  render() {
    return <div className="page home">首页</div>;
  }
}
