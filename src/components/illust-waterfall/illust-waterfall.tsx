/**
 * 插画瀑布流组件
 * @author VenDream
 * @since 2018-5-8
 */

import React, { Component } from 'react';
import classnames from 'classnames';

import { RankingIllustParams } from '../../actions/illust';
import CATEGORY from '../../constants/category';
import Waterfall from '../common/waterfall';
import IllustItem from './illust-item';
import './illust-waterfall.less';

interface IllustWaterfallProps {
  filter: RankingIllustParams;
  category: string;
  status: number;
  illusts: IllustModel[];
  column?: number;
  gutter?: number;
  fetchIllustData: (
    category: string,
    filter: RankingIllustParams
  ) => Promise<void>;
}

interface IllustWaterfallState {}

export default class IllustWaterfall extends Component<
  IllustWaterfallProps,
  IllustWaterfallState
> {
  // 渲染瀑布流
  renderIllustWaterfall() {
    const { illusts, column, gutter } = this.props;
    const items = illusts.map(illust => ({
      content: (
        <IllustItem
          id={illust.id}
          thumb={illust.imageUrls[0].medium}
          total={illust.imageUrls.length}
        />
      ),
      ratio: illust.width / illust.height,
    }));

    return <Waterfall items={items} column={column} gutter={gutter} />;
  }

  // 渲染底部加载状态
  renderLoader() {
    return <div className="waterfall-loader" />;
  }

  componentDidMount() {
    // 加载第一页数据
    const { filter, category, fetchIllustData } = this.props;
    fetchIllustData(category, filter);
  }

  render() {
    return (
      <div className="illust-waterfall">
        {this.renderIllustWaterfall()}
        {this.renderLoader()}
      </div>
    );
  }
}
