/**
 * 日期范围选择弹窗
 * @author VenDream
 * @since 2018-9-26
 */

import React, { Component } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import autobind from 'autobind-decorator';
import DatePicker from 'react-mobile-datepicker';

import Message from 'components/common/message';
import popUpFactory from 'components/hoc/popup';
import './datepicker-dialog.less';

type DateType = 'start' | 'end';
interface IProps {
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 预设开始日期
   */
  startDate?: string;
  /**
   * 预设结束日期
   */
  endDate?: string;
  /**
   * 日期范围下界
   */
  min?: string | Date;
  /**
   * 日期范围上界
   */
  max?: string | Date;
  /**
   * 弹窗关闭回调
   */
  onClose?: () => void;
  /**
   * 取消后的回调
   */
  onCancel?: (dateRange?: { startDate?: string; endDate?: string }) => void;
  /**
   * 选择日期后的回调
   */
  onSelected?: (dateRange?: { startDate?: string; endDate?: string }) => void;
}
interface IState {
  /**
   * 当前选择的开始日期
   */
  startDate: string;
  /**
   * 当前选择的结束日期
   */
  endDate: string;
  /**
   * 是否展开开始日期选择器
   */
  isOpenStartDatePicker: boolean;
  /**
   * 是否展开结束日期选择器
   */
  isOpenEndDatePicker: boolean;
}

class DatePickerDialog extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      startDate: props.startDate || null,
      endDate: props.endDate || null,
      isOpenStartDatePicker: false,
      isOpenEndDatePicker: false,
    };
  }

  // 生成日期选择器公用配置
  // 详细配置见：https://www.npmjs.com/package/react-mobile-datepicker#proptypes
  getConfig() {
    const { min, max } = this.props;
    return {
      min: min ? new Date(min) : null,
      max: max ? new Date(max) : null,
      isPopup: true,
      theme: 'ios',
      dateFormat: ['YYYY年', 'MM月', 'DD日'],
      showFormat: 'YYYY-MM-DD',
    };
  }

  /**
   * 更新日期
   *
   * @param {DateType} type 日期类型
   * @param {string} date 日期
   * @memberof DatePickerDialog
   */
  @autobind
  updateDate(type: DateType, date: string) {
    const dateStr = moment(date).format('YYYY-MM-DD');
    if (type === 'start') {
      this.setState({ startDate: dateStr, isOpenStartDatePicker: false });
    } else {
      this.setState({ endDate: dateStr, isOpenEndDatePicker: false });
    }
  }

  /**
   * 展开/收起日期选择器
   *
   * @param {DateType} type 日期类型
   * @param {boolean} status 状态
   * @memberof DatePickerDialog
   */
  @autobind
  toggleDatePicker(type: DateType, status: boolean) {
    if (type === 'start') {
      this.setState({ isOpenStartDatePicker: status });
    } else {
      this.setState({ isOpenEndDatePicker: status });
    }
  }

  // 关闭弹窗
  @autobind
  onClose() {
    this.props.onClose && this.props.onClose();
  }

  // 取消选择
  @autobind
  onCancel() {
    const { startDate, endDate } = this.state;
    this.props.onCancel && this.props.onCancel({ startDate, endDate });
    this.onClose();
  }

  // 确认选择
  @autobind
  onSelected() {
    const { startDate, endDate } = this.state;

    if (!startDate) {
      Message.show({ type: 1, message: '请选择开始日期', duration: 1000 });
      return;
    }
    if (!endDate) {
      Message.show({ type: 1, message: '请选择结束日期', duration: 1000 });
      return;
    }
    if (startDate > endDate) {
      Message.show({
        type: 3,
        message: '开始日期不能大于结束日期',
        duration: 1000,
      });
      return;
    }

    this.props.onSelected && this.props.onSelected({ startDate, endDate });
    this.onClose();
  }

  // 渲染显示的日期范围
  renderDateRange() {
    const { startDate, endDate } = this.state;
    return (
      <div className="date-range">
        <span
          className="start-date"
          onClick={() => this.toggleDatePicker('start', true)}
        >
          {startDate || '请选择'}
        </span>
        至
        <span
          className="end-date"
          onClick={() => this.toggleDatePicker('end', true)}
        >
          {endDate || '请选择'}
        </span>
      </div>
    );
  }

  renderDatePicker() {
    const {
      startDate,
      endDate,
      isOpenStartDatePicker,
      isOpenEndDatePicker,
    } = this.state;
    const dpConfig = this.getConfig();

    return (
      <div className="datepicker-group">
        <DatePicker
          {...dpConfig}
          value={startDate ? new Date(startDate) : new Date()}
          isOpen={isOpenStartDatePicker}
          onSelect={(date: string) => this.updateDate('start', date)}
          onCancel={() => this.toggleDatePicker('start', false)}
        />
        <DatePicker
          {...dpConfig}
          value={endDate ? new Date(endDate) : new Date()}
          isOpen={isOpenEndDatePicker}
          onSelect={(date: string) => this.updateDate('end', date)}
          onCancel={() => this.toggleDatePicker('end', false)}
        />
      </div>
    );
  }

  render() {
    const { className } = this.props;
    const dialogCls = classnames('g-datepicker-dialog', className);
    return (
      <div className={dialogCls}>
        <div className="dialog-mask" />
        <div className="dialog-content">
          {this.renderDateRange()}
          {this.renderDatePicker()}
          <div className="btn-group">
            <button className="cancel-btn" onClick={this.onCancel}>
              取消
            </button>
            <button className="ok-btn" onClick={this.onSelected}>
              确认
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default popUpFactory(DatePickerDialog);
