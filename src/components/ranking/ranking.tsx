/**
 * 排行榜页面组件
 * @author VenDream
 * @since 2018-5-8
 */

import React, { Component } from 'react';
import classnames from 'classnames';

import IllustWaterfall from '../../containers/illust-waterfall/illust-waterfall';
import './ranking.less';

interface RankingProps {}

export default class Ranking extends Component<RankingProps> {
  renderIllustWaterfall() {
    return <IllustWaterfall column={3} gutter={20} />;
  }

  render() {
    return <div className="ranking">{this.renderIllustWaterfall()}</div>;
  }
}
