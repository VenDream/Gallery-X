/**
 * 排行榜页面组件
 * @author VenDream
 * @since 2018-4-26
 */

import React, { Component } from 'react';
import classnames from 'classnames';

import './ranking.less';

interface RankingProps {}

export default class Ranking extends Component<RankingProps> {
  render() {
    return <div className="ranking">排行</div>;
  }
}
