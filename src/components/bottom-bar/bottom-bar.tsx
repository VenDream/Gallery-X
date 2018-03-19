/**
 * 底部导航栏
 * @author VenDream
 * @since 2018-3-19
 */

import React, { Component, MouseEventHandler } from 'react';
import { RouterAction } from 'react-router-redux';
import classnames from 'classnames';

import { RouterMap } from '../app-router';
import './bottom-bar.less';

interface BottomBarProps {
  path: string;
  redirectTo: (path: string) => RouterAction;
}

export default class BottomBar extends Component<BottomBarProps> {
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
            const classname = classnames('router-item', { active: router.path === this.props.path });
            const iconClass = `g-icon icon-${router.icon}`;

            return (
              <li
                key={key}
                className={classname}
                onClick={this.handleRoute.bind(this, router.path)}
              >
                <i className={iconClass}></i>
                {router.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
