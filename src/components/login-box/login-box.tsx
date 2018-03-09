/**
 * 登陆组件
 * @author VenDream
 * @since 2018-2-8
 */

import React, { Component } from 'react';
import { LoginParams } from '../../actions/user';
import './login-box.less';

interface LoginBoxProps {
  login: (data: LoginParams) => Promise<void>;
}

export default class LoginBox extends Component<LoginBoxProps> {
  accountInput: HTMLInputElement | null = null;
  passwordInput: HTMLInputElement | null = null;

  handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const account = this.accountInput.value;
    const password = this.passwordInput.value;

    if (!account || !password) {
      alert('请填写完整信息');
    } else {
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
