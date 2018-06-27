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

  handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    evt.keyCode === KEY_CODE.ENTER && this.doSearch();
  };

  doSearch() {
    const inputEle = this.inputRef.current;
    const word = inputEle.value || '';
    if (!word) return;

    this.props.updateFilter({ word });
  }

  renderInput() {
    return (
      <div className="search-input">
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

  // renderFilter() {}

  render() {
    return (
      <div className="search-box">
        {this.renderInput()}
        {/* {this.renderFilter()} */}
      </div>
    );
  }
}
