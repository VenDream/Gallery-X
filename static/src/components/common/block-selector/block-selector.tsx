/**
 * 块选择组件
 * @author VenDream
 * @since 2018-9-26
 */

import React, { Component } from 'react';
import classnames from 'classnames';

import './block-selector.less';

export interface Option {
  key: string;
  value: string;
}

interface IProps {
  /**
   * 选择标签
   */
  label: string;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 默认的选中项索引
   */
  selectedIdx?: number;
  /**
   * 所有选项
   */
  options: Option[];
  /**
   * 更新选中项的回调
   */
  onSelected?: (option: Option) => void;
}

interface IState {
  /**
   * 当前选中项索引
   */
  selectedIdx: number;
}

export default class BlockSelector extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { selectedIdx: props.selectedIdx || 0 };
  }

  onSelected(idx: number) {
    const { options } = this.props;

    this.setState(
      {
        selectedIdx: idx,
      },
      () => {
        const selectedOption = options[idx];
        this.props.onSelected && this.props.onSelected(selectedOption);
      }
    );
  }

  // 渲染选择项
  renderOptions() {
    const { options } = this.props;
    const { selectedIdx } = this.state;

    return options.map((option, i) => {
      const optionCls = classnames('b-option', {
        selected: selectedIdx === i,
      });
      return (
        <span
          key={option.key}
          className={optionCls}
          onClick={this.onSelected.bind(this, i)}
        >
          {option.value}
        </span>
      );
    });
  }

  render() {
    const blockCls = classnames('g-block-selector', this.props.className);
    return (
      <div className={blockCls}>
        <span className="label">{this.props.label}</span>
        <div className="b-option-list">{this.renderOptions()}</div>
      </div>
    );
  }
}
