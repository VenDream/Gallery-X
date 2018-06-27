/**
 * 插画瀑布流组件
 * @author VenDream
 * @since 2018-6-27
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import isEqual from 'lodash.isequal';

import { checkInViewport } from 'utils/common';
import throttle from 'utils/throttle';
import Waterfall from 'components/common/waterfall';
import IllustItem from './illust-item';
import './illust-waterfall.less';

interface IllustWaterfallProps {
  filter: RankingFilter | SearchFilter;
  category: string;
  status: number;
  illusts: IllustModel[];
  column?: number;
  gutter?: number;
  fetchIllustData: (
    category: string,
    filter: RankingFilter | SearchFilter
  ) => Promise<void>;
}
interface IllustWaterfallState {}

const LOADERS = [
  {},
  {
    text: '数据加载中...',
    className: 'loading',
    iconClass: 'icon-loading',
  },
  {
    text: '加载失败，请重试',
    className: 'fail',
    iconClass: 'icon-fail',
  },
  {
    text: '数据加载完毕',
    className: 'end',
    iconClass: 'icon-info',
  },
];

export default class IllustWaterfall extends Component<
  IllustWaterfallProps,
  IllustWaterfallState
> {
  // 每次加载数据的数量
  loaderStep: number = 30;
  // 滚动容器的ref
  scrollerRef: React.RefObject<HTMLDivElement> = React.createRef();
  // 加载器的ref
  loaderRef: React.RefObject<HTMLDivElement> = React.createRef();
  // throttle化的滚动加载处理
  handleScrollLoading: () => void = throttle(
    this.loadMoreIllusts.bind(this),
    100
  );

  componentDidMount() {
    // 获取第一页数据
    const { filter, category, fetchIllustData } = this.props;
    fetchIllustData(category, filter);
  }

  componentWillReceiveProps(nextProps: IllustWaterfallProps) {
    const { start: nextStart, ...nextFilter } = nextProps.filter;
    const { category, filter } = this.props;
    const { start: thisStart, ...thisFilter } = filter;

    // 筛选条件变更时，重新请求数据
    if (!isEqual(nextFilter, thisFilter)) {
      console.log('筛选条件变更，重新请求数据');
      this.props.fetchIllustData(category, nextFilter);
    }
  }

  // 加载更多插画数据
  loadMoreIllusts() {
    const { status, filter, category } = this.props;

    const loader = this.loaderRef.current;
    const scroller = this.scrollerRef.current;
    if (!scroller || !loader) return;

    // 更新筛选条件
    const newFilter = {
      ...filter,
      step: this.loaderStep,
    };

    // 判断是否满足加载条件
    const shouldLoad = status === 0 && checkInViewport(loader, scroller);
    shouldLoad && this.props.fetchIllustData(category, newFilter);
  }

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
    const { status } = this.props;
    const loader = LOADERS[status];
    const iconClass = classnames('g-icon', loader.iconClass);
    const loaderClass = classnames('waterfall-loader', loader.className);

    return (
      <div className={loaderClass} ref={this.loaderRef}>
        {loader.text ? (
          <React.Fragment>
            <span className={`loader-icon ${status === 1 ? 'rotate' : ''}`}>
              <i className={iconClass} />
            </span>
            <span className="loader-text">{loader.text}</span>
          </React.Fragment>
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <div
        className="illust-waterfall"
        ref={this.scrollerRef}
        onScroll={this.handleScrollLoading}
      >
        {this.renderIllustWaterfall()}
        {this.renderLoader()}
      </div>
    );
  }
}
