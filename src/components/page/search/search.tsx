/**
 * 搜索页面组件
 * @author VenDream
 * @since 2018-6-28
 */

import React, { Component } from 'react';

import SearchBox from 'containers/search-box';
import IllustWaterfall from 'containers/illust-waterfall';
import './search.less';

interface SearchProps {}

export default class Search extends Component<SearchProps> {
  renderSearchBox() {
    return <SearchBox />;
  }

  renderIllustWaterfall() {
    return <IllustWaterfall column={3} gutter={20} />;
  }

  render() {
    return (
      <div className="page search">
        {this.renderSearchBox()}
        {this.renderIllustWaterfall()}
      </div>
    );
  }
}
