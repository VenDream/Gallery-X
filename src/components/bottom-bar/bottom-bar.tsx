/**
 * 底部导航栏
 * @author VenDream
 * @since 2018-7-12
 */

import React, { Component } from 'react';
import { RouterAction } from 'react-router-redux';
import classnames from 'classnames';

import Message from 'components/common/message';
import RouterMap from 'constants/routers';
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

  handleRoute = (path: string) => {
    // 已选中，无需触发路由动作
    if (path === this.props.path) return;

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
