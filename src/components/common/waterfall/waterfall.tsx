/**
 * 瀑布流组件（绝对定位实现)
 * @author VenDream
 * @since 2018-5-8
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import debounce from '../../../utils/debounce';

import './waterfall.less';

interface WaterfallItem {
  /**
   * 元素内容
   */
  content: Element | JSX.Element;
  /**
   * 元素高度
   */
  height?: number;
  /**
   * 元素宽高比，若提供，则height无效
   */
  ratio?: number;
}

interface WaterfallProps {
  /**
   * 瀑布流元素
   */
  items: WaterfallItem[];
  /**
   * 瀑布流列数
   */
  column?: number;
  /**
   * 元素间的布局间距
   */
  gutter?: number;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: Record<string, any>;
}

interface WaterfallObj {
  /**
   * 瀑布流列数
   */
  column: number;
  /**
   * 元素间的布局间距
   */
  gutter: number;
  /**
   * 瀑布流的列集合
   */
  columns: Record<string, any>;
  /**
   * 元素的父节点集合
   */
  wrappers: Array<React.RefObject<HTMLDivElement>>;
}

export default class Waterfall extends Component<WaterfallProps> {
  static defaultProps: WaterfallProps = {
    items: [],
    column: 2,
    gutter: 0,
  };

  // 根节点
  root: React.RefObject<HTMLDivElement> | null = React.createRef();
  // grid节点
  grid: React.RefObject<HTMLDivElement> | null = React.createRef();
  // grid节点宽度
  gridWidth: number = 0;
  // 瀑布流对象
  waterfall: WaterfallObj | null = null;
  // 绑定debounce的update方法
  updateWaterfall: EventListenerOrEventListenerObject = debounce(
    this.checkGridWidth.bind(this),
    0
  );

  componentDidMount() {
    this.root.current && this.forceUpdate();

    // 容器的宽度发生变化时，刷新瀑布流布局
    window.addEventListener('resize', this.updateWaterfall);
  }

  componentDidUpdate() {
    this.update();
  }

  // 更新瀑布流的布局和样式
  update() {
    const { items, column, gutter } = this.props;
    if (!this.root.current || !this.root.current.parentNode) return;

    // 获取瀑布流总宽度
    const containerWidth = this.root.current.getBoundingClientRect().width;
    this.gridWidth = containerWidth;
    // 计算元素宽度
    const itemWidth = Math.floor(
      (containerWidth - (column - 1) * gutter) / column
    );

    // 初始化每一列
    for (let i = 0; i < column; i += 1) {
      this.waterfall.columns[`column_${i}`] = {
        name: `column_${i}`,
        x: i * (itemWidth + gutter),
        h: 0,
        items: [],
      };
    }

    for (const [i, item] of Object.entries(items)) {
      const shortestCol = this.findColumnOf(0);
      const wrapper = this.waterfall.wrappers[+i].current as HTMLElement;

      // 计算每一个元素的大小，位置
      const w = itemWidth;
      const h = item.ratio ? w / item.ratio : item.height || w;
      const g = shortestCol.h === 0 ? 0 : gutter;
      const x = shortestCol.x;
      const y = shortestCol.h + g;

      // 应用样式
      if (wrapper) {
        wrapper.style.top = `${y}px`;
        wrapper.style.left = `${x}px`;
        wrapper.style.width = `${w}px`;
        wrapper.style.height = `${h}px`;
      }

      // 更新列元素及高度
      shortestCol.items.push(item);
      shortestCol.h += h + g;
    }

    // 更新grid总高度
    this.updateGridHeight();
  }

  // 更新grid高度
  updateGridHeight() {
    if (!this.grid.current) return;

    const grid = this.grid.current;
    const longestCol = this.findColumnOf(1);
    grid.style.height = `${longestCol.h}px`;
  }

  // 检查grid宽度是否发生变化
  checkGridWidth() {
    if (!this.root.current) return;
    const gridWidth = this.root.current.getBoundingClientRect().width;
    this.gridWidth !== gridWidth && this.update();
  }

  // 找出最短(长)列, 0: 最短，1：最长
  findColumnOf(type = 0) {
    const { column, columns } = this.waterfall;
    let targetCol = columns.column_0;

    for (let i = 0; i < column; i += 1) {
      const col = columns[`column_${i}`];
      const condition = type === 0 ? col.h < targetCol.h : col.h > targetCol.h;
      condition && (targetCol = col);
    }

    return targetCol;
  }

  // 渲染瀑布流grid布局
  renderWaterfallGrid() {
    const waterfallItems = [];
    const rootNode = this.root.current;
    const { items, column, gutter } = this.props;

    if (!rootNode || !rootNode.parentNode) return null;

    // 重新生成瀑布流对象
    this.waterfall = { column, gutter, columns: {}, wrappers: [] };

    // 构筑瀑布流
    for (const [i, item] of Object.entries(items)) {
      const wrapperRef: React.RefObject<HTMLDivElement> = React.createRef();
      const waterfallItem = (
        <div className="waterfall-item" key={i} ref={wrapperRef}>
          {item.content}
        </div>
      );

      waterfallItems.push(waterfallItem);
      this.waterfall.wrappers.push(wrapperRef);
    }

    return (
      <div className="waterfall-grid" ref={this.grid}>
        {waterfallItems}
      </div>
    );
  }

  render() {
    const { className, style } = this.props;

    return (
      <div
        className={classnames('g-waterfall', className)}
        style={style}
        ref={this.root}
      >
        {this.renderWaterfallGrid()}
      </div>
    );
  }
}
