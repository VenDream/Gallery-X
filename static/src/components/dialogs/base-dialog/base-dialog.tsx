/**
 * 全屏展示弹窗基础类
 * @author VenDream
 * @since 2018-12-10
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import autobind from 'autobind-decorator';
import popUpFactory from 'components/hoc/popup';

import SelfDialog from '.';
import './base-dialog.less';

interface IProps {
  /**
   * 类名
   */
  className?: string;
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
  close: () => void;
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
    this.state.close && this.state.close();
  }

  render() {
    const { className } = this.props;
    const { class: dialogClass, title, content } = this.state;
    const dialogCls = classnames('g-dialog', className, dialogClass);

    return (
      <div className={dialogCls}>
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

export default popUpFactory(BaseDialog);
