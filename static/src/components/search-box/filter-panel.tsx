/**
 * 搜索筛选面板组件
 * @author VenDream
 * @since 2018-9-13
 */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import OPTIONS from './options';
import BlockSelector, { Option } from 'components/common/block-selector';
import DatePickerDialog from 'components/common/datepicker-dialog';
import './filter-panel.less';

interface IProps {
  filter: SearchFilter;
  doSearch: (patch: Partial<SearchFilter>) => void;
}
interface IState {
  currFilter: SearchFilter;
}

export default class FilterPanel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currFilter: props.filter,
    };
  }

  @autobind
  doSearch() {
    const { currFilter } = this.state;
    this.props.doSearch(currFilter);
  }

  // 更新临时筛选条件
  updateFilter(patch: Partial<SearchFilter>) {
    this.setState((prevState: IState) => ({
      currFilter: {
        ...prevState.currFilter,
        ...patch,
      },
    }));
    console.table(this.state.currFilter);
  }

  /**
   * 更新搜索排序
   *
   * @param {Option} option 更新项
   * @returns
   * @memberof FilterPanel
   */
  @autobind
  updateSortFilter(option: Option) {
    const sort = option.key;
    if (
      sort !== 'date_desc' &&
      sort !== 'date_asc' &&
      sort !== 'popular_desc'
    ) {
      return;
    }
    this.updateFilter({ sort });
  }

  /**
   * 更新搜索对象
   *
   * @param {Option} option 更新项
   * @returns
   * @memberof FilterPanel
   */
  @autobind
  updateTargetFilter(option: Option) {
    const target = option.key;
    if (
      target !== 'partial_match_for_tags' &&
      target !== 'exact_match_for_tags' &&
      target !== 'title_and_caption'
    ) {
      return;
    }
    this.updateFilter({ target });
  }

  /**
   * 更新日期范围
   *
   * @param {Option} option 更新项
   * @returns
   * @memberof FilterPanel
   */
  @autobind
  updateDateFilter(option: Option) {
    const type = option.key;
    if (type === 'all') {
      this.updateFilter({ startDate: null, endDate: null });
    } else if (type === 'specified') {
      DatePickerDialog.show({
        transitionClass: 'fade-in',
        onCancel: this.handleSelectDate,
        onSelected: this.handleSelectDate,
      });
    }
  }

  /**
   * 更新日期范围
   *
   * @param {string} [startDate] 开始日期
   * @param {string} [endDate] 结束日期
   * @memberof FilterPanel
   */
  @autobind
  handleSelectDate(startDate?: string, endDate?: string) {
    console.log(startDate, endDate);
  }

  // 搜索排序
  renderSortFilter() {
    const { sort } = this.props.filter;
    const options = OPTIONS.sort;
    const selectedIdx = options.findIndex(option => option.key === sort) || 0;
    return (
      <BlockSelector
        label="搜索排序"
        options={options}
        selectedIdx={selectedIdx}
        onSelected={this.updateSortFilter}
      />
    );
  }

  // 搜索对象
  renderTargetFilter() {
    const { target } = this.props.filter;
    const options = OPTIONS.target;
    const selectedIdx = options.findIndex(option => option.key === target) || 0;
    return (
      <BlockSelector
        label="搜索对象"
        options={options}
        selectedIdx={selectedIdx}
        onSelected={this.updateTargetFilter}
      />
    );
  }

  // 日期范围
  renderDateFilter() {
    const { startDate, endDate } = this.props.filter;
    const hasSetDate = startDate && endDate;

    return (
      <BlockSelector
        label="日期范围"
        options={[
          { key: 'all', value: '全部时期' },
          { key: 'specified', value: '指定日期' },
        ]}
        selectedIdx={hasSetDate ? 1 : 0}
        onSelected={this.updateDateFilter}
      />
    );
  }

  render() {
    return (
      <div className="filter-panel fade-in-up">
        <div className="filter-options">
          {this.renderSortFilter()}
          {this.renderTargetFilter()}
          {this.renderDateFilter()}
        </div>
        <button className="confirm-btn" onClick={this.doSearch}>
          按这个条件搜索
        </button>
      </div>
    );
  }
}
