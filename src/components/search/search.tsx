/**
 * 搜索页面组件
 * @author VenDream
 * @since 2018-6-26
 */

import React, { Component } from 'react';

import './search.less';

interface SearchProps {}

export default class Search extends Component<SearchProps> {
  render() {
    return <div className="page search">搜索</div>;
  }
}
