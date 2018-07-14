/**
 * 搜索框组件
 * @author VenDream
 * @since 2018-6-27
 */

import React, { Component, KeyboardEvent } from 'react';

import KEY_CODE from 'constants/keycode';
import './search-box.less';

interface SearchBoxProps {
  filter: SearchFilter;
  updateFilter: (patch: Record<string, any>) => void;
}

interface SearchBoxState {
  /**
   * 是否展开筛选条件面板
   */
  showFilterPanel: boolean;
}

export default class SearchBox extends Component<
  SearchBoxProps,
  SearchBoxState
> {
  state = {
    showFilterPanel: false,
  };

  // 输入框ref
  inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  // 监听Enter键
  handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    evt.keyCode === KEY_CODE.ENTER && this.doSearch();
  };

  // 更新filter触发搜索请求
  doSearch() {
    const inputEle = this.inputRef.current;
    const word = inputEle.value || '';
    if (!word) return;

    this.props.updateFilter({ word });
  }

  // 切换filter面板展开状态
  toggleFilterPanel = () => {
    this.setState(prevState => ({
      showFilterPanel: !prevState.showFilterPanel,
    }));
  };

  // 渲染背景蒙层
  renderFilterMask() {
    const { showFilterPanel } = this.state;
    return showFilterPanel ? <div className="search-filter-mask" /> : null;
  }

  // 渲染输入框
  renderFilterInput() {
    return (
      <div className="search-filter-input">
        <i className="g-icon icon-search" />
        <input
          ref={this.inputRef}
          type="text"
          placeholder="输入关键字以进行搜索"
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }

  // 渲染filter按钮
  renderFilterBtn() {
    return (
      <i
        className="search-filter-btn g-icon icon-filter"
        onClick={this.toggleFilterPanel}
      />
    );
  }

  // 渲染filter面板
  renderFilterPanel() {
    const { showFilterPanel } = this.state;
    return showFilterPanel ? <div className="search-filter-panel" /> : null;
  }

  render() {
    return (
      <div className="search-box">
        {this.renderFilterMask()}
        {this.renderFilterInput()}
        {this.renderFilterBtn()}
        {this.renderFilterPanel()}
      </div>
    );
  }
}
