/**
 * 底部导航栏
 * @author VenDream
 * @since 2018-4-26
 */

import React, { Component, MouseEventHandler } from 'react';
import { RouterAction } from 'react-router-redux';
import classnames from 'classnames';

import Message from './../message';
import RouterMap from '../../constants/routers';
import './bottom-bar.less';

interface BottomBarProps {
  path: string;
  redirectTo: (path: string) => RouterAction;
}

export default class BottomBar extends Component<BottomBarProps> {
  componentDidMount() {
    // 全局底部栏加载时，隐藏所有消息提示
    Message.hide();
  }

  componentWillUnmount() {
    // 全局底部栏卸载时，提示退出登录
    Message.show({ type: 2, message: '你已退出登陆' });
  }

  handleRoute = (path: string) => {
    this.props.redirectTo(path);
  };

  render() {
    return (
      <div className="bottom-bar">
        <ul className="router-list">
          {Object.entries(RouterMap).map((r, idx) => {
            const key = r[0];
            const router = r[1];
            const classname = classnames('router-item', {
              active: router.path === this.props.path,
            });
            const iconClass = `g-icon icon-${router.icon}`;

            return (
              <li
                key={key}
                className={classname}
                onClick={this.handleRoute.bind(this, router.path)}
              >
                <i className={iconClass} />
                {router.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
