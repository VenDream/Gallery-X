/**
 * 搜索框组件
 * @author VenDream
 * @since 2018-9-12
 */

import React, { Component, KeyboardEvent } from 'react';
import classnames from 'classnames';
import autobind from 'autobind-decorator';

import KEY_CODE from 'constants/keycode';
import FilterPanel from './filter-panel';
import './search-box.less';

interface IProps {
  filter: SearchFilter;
  updateFilter: (patch: Partial<SearchFilter>) => void;
}

interface IState {
  /**
   * 是否展开筛选条件面板
   */
  showFilterPanel: boolean;
}

export default class SearchBox extends Component<IProps, IState> {
  state: IState = {
    showFilterPanel: false,
  };

  // 输入框ref
  inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  // 监听Enter键
  @autobind
  handleKeyDown(evt: KeyboardEvent<HTMLInputElement>) {
    evt.keyCode === KEY_CODE.ENTER && this.doSearch();
  }

  /**
   * 执行搜索动作
   *
   * @param {Partial<SearchFilter>} [patch] 搜索条件
   * @returns
   * @memberof SearchBox
   */
  @autobind
  doSearch(patch?: Partial<SearchFilter>) {
    const inputEle = this.inputRef.current;
    const word = inputEle.value || '';
    if (!word) return;

    const filter = { ...patch, word };
    this.setState({ showFilterPanel: false });
    this.props.updateFilter(filter);
  }

  // 切换filter面板展开状态
  @autobind
  toggleFilterPanel() {
    this.setState(prevState => ({
      showFilterPanel: !prevState.showFilterPanel,
    }));
  }

  // 渲染背景蒙层
  renderFilterMask() {
    const { showFilterPanel } = this.state;
    return showFilterPanel ? (
      <div className="filter-mask" onClick={this.toggleFilterPanel} />
    ) : null;
  }

  // 渲染输入框
  renderFilterInput() {
    const { word } = this.props.filter;
    return (
      <div className="filter-input">
        <i className="g-icon icon-search" />
        <input
          ref={this.inputRef}
          type="text"
          placeholder="输入关键词以进行搜索"
          onKeyDown={this.handleKeyDown}
        />
        {word && (
          <i
            className="filter-btn g-icon icon-filter"
            onClick={this.toggleFilterPanel}
          />
        )}
      </div>
    );
  }

  // 渲染filter面板
  renderFilterPanel() {
    const { filter } = this.props;
    const { showFilterPanel } = this.state;
    return showFilterPanel ? (
      <FilterPanel filter={filter} doSearch={this.doSearch} />
    ) : null;
  }

  render() {
    const { showFilterPanel } = this.state;
    const className = classnames('search-box', {
      expand: showFilterPanel,
    });

    return (
      <div className={className}>
        {this.renderFilterMask()}
        {this.renderFilterInput()}
        {this.renderFilterPanel()}
      </div>
    );
  }
}
