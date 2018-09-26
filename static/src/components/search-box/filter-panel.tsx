/**
 * 搜索筛选面板组件
 * @author VenDream
 * @since 2018-9-26
 */

import React, { Component } from 'react';
import moment from 'moment';
import autobind from 'autobind-decorator';

import OPTIONS from './options';
import BlockSelector, { Option } from 'components/common/block-selector';
import DatePickerDialog from 'components/common/datepicker-dialog';
import './filter-panel.less';

type SearchFilterPatch = Partial<SearchFilter>;

interface IProps {
  filter: SearchFilter;
  doSearch: (patch: Partial<SearchFilter>) => void;
}
interface IState {
  dateKey: number;
  currFilter: SearchFilter;
}

export default class FilterPanel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dateKey: Date.now(),
      currFilter: props.filter,
    };
  }

  @autobind
  doSearch() {
    const { currFilter } = this.state;
    this.props.doSearch(currFilter);
  }

  // 更新临时筛选条件
  @autobind
  updateFilter(patch: SearchFilterPatch) {
    this.setState((prevState: IState) => ({
      currFilter: {
        ...prevState.currFilter,
        ...patch,
      },
    }));
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
    const sort = option.key as 'date_desc' | 'date_asc' | 'popular_desc';
    const patch: SearchFilterPatch = { sort };
    this.updateFilter(patch);
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
    const target = option.key as
      | 'partial_match_for_tags'
      | 'exact_match_for_tags'
      | 'title_and_caption';
    const patch: SearchFilterPatch = { target };
    this.updateFilter(patch);
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
    const { startDate, endDate } = this.state.currFilter;
    const type = option.key;

    if (type === 'all') {
      this.updateFilter({ startDate: null, endDate: null });
    } else if (type === 'specified') {
      DatePickerDialog.show({
        // Pixiv的数据从[2007-09-13]开始生成
        min: moment([2007, 9 - 1, 13]).toDate(),
        // 最大日期不能超过今天
        max: moment().toDate(),
        startDate,
        endDate,
        transitionClass: 'fade-in',
        onCancel: () => {
          // 取消选择日期，重置为全部时期
          if (!startDate || !endDate) {
            this.setState({ dateKey: Date.now() });
          }
        },
        onSelected: this.updateFilter,
      });
    }
  }

  // 搜索排序
  renderSortFilter() {
    const { sort } = this.state.currFilter;
    const options = OPTIONS.sort;
    const selectedIdx = options.findIndex(option => option.key === sort) || 0;
    return (
      <BlockSelector
        label="搜索排序"
        className="date-sort"
        options={options}
        selectedIdx={selectedIdx}
        onSelected={this.updateSortFilter}
      />
    );
  }

  // 搜索对象
  renderTargetFilter() {
    const { target } = this.state.currFilter;
    const options = OPTIONS.target;
    const selectedIdx = options.findIndex(option => option.key === target) || 0;
    return (
      <BlockSelector
        label="搜索对象"
        className="search-target"
        options={options}
        selectedIdx={selectedIdx}
        onSelected={this.updateTargetFilter}
      />
    );
  }

  // 日期范围
  renderDateFilter() {
    const { startDate, endDate } = this.state.currFilter;
    const isAll = !startDate || !endDate;

    return (
      <BlockSelector
        key={this.state.dateKey}
        label="日期范围"
        className="date-range"
        options={[
          { key: 'all', value: '全部时期' },
          { key: 'specified', value: '指定日期' },
        ]}
        selectedIdx={isAll ? 0 : 1}
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
