/**
 * 插画瀑布流组件
 * @author VenDream
 * @since 2018-11-28
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import isEqual from 'lodash.isequal';

import { checkInViewport } from 'utils/common';
import throttle from 'utils/throttle';
import Toper from 'components/common/toper';
import Waterfall from 'components/common/waterfall';
import IllustItem from './illust-item';
import CATEGORY from 'constants/category';
import './illust-waterfall.less';

interface IllustWaterfallProps {
  step: number;
  filter: RankingFilter | SearchFilter;
  category: string;
  status: number;
  illusts: IllustSaveModel[];
  column?: number;
  gutter?: number;
  fetchIllustData: (
    category: string,
    filter: RankingFilter | SearchFilter
  ) => void;
}
interface IllustWaterfallState {}

// 浏览器宽度
const BROWSER_WIDTH = document.documentElement.clientWidth;
// 加载文本图标常量
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
  loaderStep: number = 0;
  // 滚动容器的ref
  scrollerRef: React.RefObject<HTMLDivElement> = React.createRef();
  // 加载器的ref
  loaderRef: React.RefObject<HTMLDivElement> = React.createRef();
  // throttle化的滚动加载处理
  handleScrollLoading: () => void = throttle(
    this.loadMoreIllusts.bind(this),
    100
  );

  constructor(props: IllustWaterfallProps) {
    super(props);
    // 设置step
    this.loaderStep = props.step;
  }

  componentDidMount() {
    // 获取第一页数据
    const { filter, category, fetchIllustData } = this.props;
    fetchIllustData(category, filter);
  }

  componentDidUpdate(prevProps: IllustWaterfallProps) {
    const { start: prevStart, ...prevFilter } = prevProps.filter;
    const { category, filter } = this.props;
    const { start: thisStart, ...thisFilter } = filter;

    // 筛选条件变更时，重新请求数据
    if (!isEqual(prevFilter, thisFilter)) {
      this.props.fetchIllustData(category, {
        ...thisFilter,
        start: 0,
      });
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
    const isLargeScreen = BROWSER_WIDTH >= 768;
    const thumbSrcKey = isLargeScreen ? 'large' : 'medium';
    const items = illusts.map(illust => ({
      content: (
        <IllustItem
          id={illust.id}
          thumb={illust.imageUrls[0][thumbSrcKey]}
          total={illust.imageUrls.length}
        />
      ),
      ratio: illust.width / illust.height,
    }));

    return <Waterfall items={items} column={column} gutter={gutter} />;
  }

  // 渲染底部加载状态
  renderLoader() {
    const { status, filter, category } = this.props;
    // 是否搜索不到任何结果
    const isNoSearchResult =
      category === CATEGORY.SEARCH && filter.start === 0 && status === 3;
    const loader = LOADERS[status];
    const iconClass = classnames('g-icon', loader.iconClass);
    const loaderClass = classnames('waterfall-loader', loader.className, {
      'no-result': isNoSearchResult,
    });

    return (
      <div className={loaderClass} ref={this.loaderRef}>
        {loader.text ? (
          <React.Fragment>
            <span className={`loader-icon ${status === 1 ? 'rotate' : ''}`}>
              <i className={iconClass} />
            </span>
            <span className="loader-text">
              {isNoSearchResult ? (
                <div className="no-result-tips">
                  没有找到关于&nbsp;
                  <span className="keyword">
                    "{(filter as SearchFilter).word}"
                  </span>
                  &nbsp;的结果
                </div>
              ) : (
                loader.text
              )}
            </span>
          </React.Fragment>
        ) : null}
      </div>
    );
  }

  render() {
    const { illusts, status } = this.props;
    const isEmpty = status === 0 && !illusts.length;

    return (
      <div
        className="illust-waterfall"
        ref={this.scrollerRef}
        onScroll={this.handleScrollLoading}
      >
        {isEmpty ? (
          <div className="empty">
            <p className="tips">什么都木有Orz...</p>
          </div>
        ) : (
          <React.Fragment>
            {this.renderIllustWaterfall()}
            {this.renderLoader()}
          </React.Fragment>
        )}
        <Toper />
      </div>
    );
  }
}
