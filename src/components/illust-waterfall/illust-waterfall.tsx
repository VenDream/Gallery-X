/**
 * 插画瀑布流组件
 * @author VenDream
 * @since 2018-4-27
 */

import React, { Component } from 'react';
import classnames from 'classnames';

import Waterfall from '../common/waterfall';
import './illust-waterfall.less';

interface IllustWaterfallProps {
  category: string;
  status: number;
  illusts: IllustModel[];
  column?: number;
  gutter?: number;
}

interface IllustWaterfallState {}

export default class IllustWaterfall extends Component<
  IllustWaterfallProps,
  IllustWaterfallState
> {
  static defaultProps: IllustWaterfallProps = {
    category: '',
    status: 0,
    illusts: [],
    column: 3,
    gutter: 20,
  };

  renderIllustWaterfall() {
    const { illusts, column, gutter } = this.props;
    const items = illusts.map(el => ({
      content: <div>{el}</div>,
      height: 1,
    }));

    return <Waterfall items={items} column={column} gutter={gutter} />;
  }

  renderLoader() {
    return <div className="waterfall-loader" />;
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
