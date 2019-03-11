/**
 * 全屏展示弹窗基础类
 * @author VenDream
 * @since 2018-12-25
 */

import store, { MyContext } from 'store';
import { Provider } from 'react-redux';
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
   * 是否可以渲染内容
   */
  shouldRenderContent: boolean;
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
  // 根节点引用
  rootRef: React.RefObject<HTMLDivElement> = React.createRef();

  state: IState = {
    shouldRenderContent: false,
    class: 'base-dialog',
    title: '',
    content: '',
    close: SelfDialog.hide,
  };

  @autobind
  hide() {
    // const { popupInstanceId } = this.props;
    this.state.close && this.state.close();
  }

  componentDidMount() {
    const root = this.rootRef.current;
    if (root) {
      root.addEventListener('animationend', this.renderContent);
      root.addEventListener('webkitAnimationEnd', this.renderContent);
    }
  }

  componentWillUnmount() {
    const root = this.rootRef.current;
    if (root) {
      root.removeEventListener('animationend', this.renderContent);
      root.removeEventListener('webkitAnimationEnd', this.renderContent);
    }
  }

  // 渲染内容
  @autobind
  renderContent(evt: AnimationEvent) {
    if (evt.target !== evt.currentTarget) return;
    this.setState({ shouldRenderContent: true });
  }

  render() {
    const { className } = this.props;
    const { class: dialogClass, title, content } = this.state;
    const dialogCls = classnames('g-dialog', className, dialogClass);
    const shouldRenderContent = this.state.shouldRenderContent;

    return (
      <div className={dialogCls} ref={this.rootRef}>
        <div className="dialog-title">
          <h3>{title}</h3>
          <span className="close-btn" onClick={this.hide}>
            <i className="g-icon icon-close" />
          </span>
        </div>
        <div className="dialog-body">
          {shouldRenderContent ? (
            <Provider store={store} context={MyContext}>
              {content}
            </Provider>
          ) : null}
        </div>
      </div>
    );
  }
}

export default popUpFactory(BaseDialog, false);
