/**
 * 回到顶部组件
 * @author VenDream
 * @since 2019-5-21
 */

import classnames from 'classnames';
import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { throttle, debounce } from 'helpful-decorators';
import { scrollTo } from 'utils/scroll';

import './toper.less';

// 右下角偏移
const BOTTOM_OFFSET = 40;
const RIGHT_OFFSET = 20;

interface ToperProps {
  /**
   * 动画时长
   */
  duration?: number;
  /**
   * 滚动容器滚动多少距离后开始显示
   */
  threshold?: number;
  /**
   * 过渡效果类
   */
  transitionClass?: string;
}

interface ToperState {
  /**
   * 当前是否可见
   */
  visible: boolean;
  /**
   * 当前位置样式
   */
  style: {
    top: number;
    left: number;
  };
}

export default class Toper extends Component<ToperProps, ToperState> {
  static defaultProps: ToperProps = {
    duration: 800,
    threshold: 300,
    transitionClass: 'fade-in',
  };

  state: ToperState = {
    visible: false,
    style: { top: 0, left: 0 },
  };

  // 根节点ref
  rootRef: React.RefObject<HTMLDivElement> = React.createRef();
  // 滚动容器
  scroller: HTMLElement | null = null;

  componentDidMount() {
    const root = this.rootRef.current;

    // 优先以父节点作为滚动容器
    this.scroller =
      (root && root.parentElement) ||
      (document.scrollingElement as HTMLElement);

    // 监听父滚动容器的滚动事件
    this.scroller.addEventListener('scroll', this.handleScroll);
    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize);
    // 挂载后进行第一次定位
    this.handleResize();
  }

  componentWillUnmount() {
    // 移除滚动监听
    this.scroller.removeEventListener('scroll', this.handleScroll);
  }

  // 跟随父节点固定位置
  @autobind
  @debounce(100)
  handleResize() {
    if (!this.scroller) return;
    const containerRect = this.scroller.getBoundingClientRect();
    const selfRect = this.rootRef.current.getBoundingClientRect();
    const top = containerRect.height - selfRect.height - BOTTOM_OFFSET;
    const left = containerRect.right - selfRect.width - RIGHT_OFFSET;
    this.setState({ style: { top, left } });
  }

  // 滚动处理
  @autobind
  @throttle(100)
  handleScroll() {
    const { threshold } = this.props;
    const scrollTop = this.scroller.scrollTop;

    this.setState({ visible: scrollTop >= threshold });
  }

  // 回到顶部
  @autobind
  goTop() {
    scrollTo(this.scroller, 0, this.props.duration);
  }

  render() {
    const { visible } = this.state;
    const { transitionClass } = this.props;
    const className = classnames('g-toper', {
      active: visible,
      [transitionClass]: visible,
    });

    return (
      <div
        className={className}
        ref={this.rootRef}
        style={this.state.style}
        onClick={this.goTop}
        title="回到顶部"
      >
        <i className="g-icon icon-top" />
      </div>
    );
  }
}
