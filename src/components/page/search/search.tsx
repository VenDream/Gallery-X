/**
 * 搜索页面组件
 * @author VenDream
 * @since 2018-6-27
 */

import React, { Component } from 'react';

import SearchBox from 'containers/search-box';
import IllustWaterfall from 'containers/illust-waterfall';
import './search.less';

interface SearchProps {
  filter: SearchFilter;
}

export default class Search extends Component<SearchProps> {
  renderSearchBox() {
    return <SearchBox />;
  }
  renderIllustWaterfall() {
    const { filter } = this.props;
    return filter.word ? (
      <IllustWaterfall column={3} gutter={20} />
    ) : (
      <div className="empty-tips">
        <p className="tips">什么东西都木有Orz...</p>
      </div>
    );
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
