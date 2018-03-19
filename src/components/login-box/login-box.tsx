/**
 * 登陆组件
 * @author VenDream
 * @since 2018-3-19
 */

import React, { Component } from 'react';
import classnames from 'classnames';

import { LoginParams } from '../../actions/user';
import { UserState } from '../../reducers/user';
import './login-box.less';

interface LoginBoxProps {
  user: UserState;
  login: (data: LoginParams) => Promise<void>;
}

export default class LoginBox extends Component<LoginBoxProps> {
  accountInput: HTMLInputElement | null = null;
  passwordInput: HTMLInputElement | null = null;

  componentDidUpdate(prevProps: LoginBoxProps) {
    const prevUser = prevProps.user;
    const thisUser = this.props.user;
    /**
     * 是否登陆失败
     */
    const isFailedToLogin =
      prevUser.isLoading && !thisUser.isLoading && !thisUser.id;

    if (isFailedToLogin) {
      alert(thisUser.message);
    }
  }

  handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (this.props.user.isLoading) {
      return;
    }

    const account = this.accountInput.value;
    const password = this.passwordInput.value;

    if (!account || !password) {
      alert('请填写完整信息');
    } else {
      this.props.login({ account, password });
    }
  };

  render() {
    const isLoading = this.props.user.isLoading;
    const ro = isLoading ? { readOnly: true } : {};

    return (
      <div className="login-box">
        <h2>Pixiv&nbsp;登陆</h2>
        <form
          className={classnames('login-form', {
            loading: isLoading,
          })}
        >
          <input
            type="text"
            className="account"
            placeholder="PixivID/邮箱"
            ref={node => (this.accountInput = node)}
            {...ro}
          />
          <input
            type="password"
            className="password"
            placeholder="密码"
            ref={node => (this.passwordInput = node)}
            {...ro}
          />
          <button className="submit" onClick={this.handleLogin}>
            {isLoading ? '登陆中...' : '登陆'}
          </button>
        </form>
      </div>
    );
  }
}
