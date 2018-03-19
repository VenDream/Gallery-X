/**
 * 底部导航栏
 * @author VenDream
 * @since 2018-3-19
 */

import React, { Component, MouseEventHandler } from 'react';
import { RouterAction } from 'react-router-redux';

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
            return (
              <li
                key={key}
                className="router-item"
                onClick={this.handleRoute.bind(this, router.path)}
              >
                {router.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
