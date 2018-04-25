/**
 * 消息提示组件
 * @author VenDream
 * @since 2018-4-24
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import popUpFactory from '../../components/hoc/popup';

import './message.less';

interface MessageProps {
  /**
   * 消息类型，
   * 0 -> 加载中
   * 1 -> 普通
   * 2 -> 成功
   * 3 -> 失败
   */
  type?: number;
  /**
   * 消息内容
   */
  message?: string;
  /**
   * 消息持续时长
   */
  duration?: number;
  /**
   * 是否显示图标
   */
  showIcon?: boolean;
  /**
   * 是否显示蒙层
   */
  showMask?: boolean;
  /**
   * 自定义类
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: { [props: string]: string | number };
  /**
   * 关闭弹出层
   */
  onClose?: () => void;
}

// 消息类型图标类
const MESSAGE_ICONS = [
  'icon-loading',
  'icon-info',
  'icon-success',
  'icon-fail',
];

export class Message extends Component<MessageProps> {
  static defaultProps: MessageProps = {
    type: 0,
    message: '',
    duration: 3000,
    showIcon: true,
    showMask: false,
  };

  // 定时器
  timer: number | null = null;

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.destroy();
  }

  startTimer() {
    const { duration } = this.props;
    if (!duration || duration < 0) return;

    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.destroy();
    }, duration);
  }

  // 销毁组件
  destroy = () => {
    const { duration, onClose } = this.props;
    if (!duration || duration < 0) return;

    clearTimeout(this.timer);
    onClose && onClose();
  };

  render() {
    const { type, message, showIcon, showMask, className, style } = this.props;
    const icon = MESSAGE_ICONS[type] || '';

    if (!icon) return null;

    return (
      <div
        className={classnames('g-message', { mask: showMask }, className)}
        onClick={this.destroy}
      >
        <div className="msg-box" style={style}>
          {showIcon && <i className={classnames('g-icon', icon)} />}
          {message && <p className="msg-content">{message}</p>}
        </div>
      </div>
    );
  }
}

export default popUpFactory(Message);
