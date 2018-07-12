/**
 * 回到顶部组件
 * @author VenDream
 * @since 2018-7-12
 */

import classnames from 'classnames';
import React, { Component } from 'react';
import throttle from 'utils/throttle';
import { scrollTo } from 'utils/scroll';

import './toper.less';

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
   * 自定义样式
   */
  style?: {
    /**
     * 距底部位置
     */
    bottom?: string;
    /**
     * 距右边缘位置
     */
    right?: string;
  };
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
}

export default class Toper extends Component<ToperProps, ToperState> {
  static defaultProps: ToperProps = {
    duration: 800,
    threshold: 300,
    style: {
      bottom: '60px',
      right: '20px',
    },
    transitionClass: 'fade-in',
  };

  state: ToperState = {
    visible: false,
  };

  // 根节点ref
  rootRef: React.RefObject<HTMLDivElement> = React.createRef();
  // 滚动容器
  scroller: HTMLElement | null = null;

  constructor(props: ToperProps) {
    super(props);
    this.scrollHandler = throttle(this.handleScroll.bind(this), 100);
  }

  // 滚动处理
  scrollHandler: (evt: EventTarget) => void = () => {};

  componentDidMount() {
    const root = this.rootRef.current;

    // 优先以父节点作为滚动容器
    this.scroller =
      (root && root.parentElement) ||
      (document.scrollingElement as HTMLElement);

    // 监听父滚动容器的滚动事件
    this.scroller.addEventListener('scroll', this.scrollHandler.bind(this));
  }

  componentWillUnmount() {
    // 移除滚动监听
    this.scroller.removeEventListener('scroll', this.scrollHandler.bind(this));
  }

  // 滚动处理
  handleScroll() {
    const { threshold } = this.props;
    const scrollTop = this.scroller.scrollTop;

    this.setState({ visible: scrollTop >= threshold });
  }

  // 回到顶部
  goTop = () => {
    scrollTo(this.scroller, 0, this.props.duration);
  };

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
        style={this.props.style}
        onClick={this.goTop}
        title="回到顶部"
      >
        <i className="g-icon icon-top" />
      </div>
    );
  }
}
