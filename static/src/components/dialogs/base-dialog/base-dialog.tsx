/**
 * 全屏展示弹窗基础类
 * @author VenDream
 * @since 2018-12-24
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import autobind from 'autobind-decorator';
import popUpFactory from 'components/hoc/popup';

import SelfDialog from '.';
import './base-dialog.less';

interface IProps {
  /**
   * 唯一标识ID
   */
  id: string;
  /**
   * 类名
   */
  className?: string;
  /**
   * 弹窗实例ID
   */
  popupInstanceId?: string;
  /**
   * 其他属性
   */
  [key: string]: any;
}
interface IState {
  /**
   * 弹窗类名
   */
  class: string;
  /**
   * 弹窗标题
   */
  title: string;
  /**
   * 主体内容
   */
  content: JSX.Element | string;
  /**
   * 弹窗关闭方法
   */
  close: (popupInstanceId?: string) => void;
}

export class BaseDialog extends Component<IProps, IState> {
  state: IState = {
    class: 'base-dialog',
    title: 'dialog',
    content: '',
    close: SelfDialog.hide,
  };

  @autobind
  hide() {
    // const { popupInstanceId } = this.props;
    this.state.close && this.state.close();
  }

  render() {
    const { className, popupInstanceId } = this.props;
    const { class: dialogClass, title, content } = this.state;
    const dialogCls = classnames('g-dialog', className, dialogClass);

    return (
      <div className={dialogCls} data-popup-instance-id={popupInstanceId}>
        <div className="dialog-title">
          <h3>{title}</h3>
          <span className="close-btn" onClick={this.hide}>
            <i className="g-icon icon-close" />
          </span>
        </div>
        <div className="dialog-body">{content}</div>
      </div>
    );
  }
}

export default popUpFactory(BaseDialog, false);
