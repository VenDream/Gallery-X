/**
 * 登陆组件
 * @author VenDream
 * @since 2018-4-24
 */

import React, { Component } from 'react';
import classnames from 'classnames';

import { LoginParams } from '../../actions/user';
import { UserState } from '../../reducers/user';
import Message from '../message';
import './login-box.less';

interface LoginBoxProps {
  user: UserState;
  login: (data: LoginParams) => Promise<void>;
}

/**
 * showTips弹窗
 *
 * @param {string} message 消息内容
 * @param {number} type 消息类型
 * @param {number} duration 持续时长
 */
function showTips(message: string, type: number = 1, duration: number = 3000) {
  return Message.show({ type, message, duration });
}

export default class LoginBox extends Component<LoginBoxProps> {
  accountInput: HTMLInputElement | null = null;
  passwordInput: HTMLInputElement | null = null;

  componentDidUpdate(prevProps: LoginBoxProps) {
    const prevUser = prevProps.user;
    const thisUser = this.props.user;

    // 是否登陆失败
    const isFailedToLogin =
      prevUser.isLoading && !thisUser.isLoading && !thisUser.id;

    if (isFailedToLogin) {
      showTips(thisUser.message, 3);
    }
  }

  handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const account = this.accountInput.value;
    const password = this.passwordInput.value;

    if (!account || !password) {
      showTips('请填写完整信息', 1, 1000);
      Message.hide();
    } else {
      showTips('登陆中...', 0, -1);
      this.props.login({ account, password });
    }
  };

  render() {
    return (
      <div className="login-box">
        <h2>Pixiv&nbsp;登陆</h2>
        <form className="login-form">
          <input
            type="text"
            className="account"
            placeholder="PixivID/邮箱"
            ref={node => (this.accountInput = node)}
          />
          <input
            type="password"
            className="password"
            placeholder="密码"
            ref={node => (this.passwordInput = node)}
          />
          <button className="submit" onClick={this.handleLogin}>
            登陆
          </button>
        </form>
      </div>
    );
  }
}
