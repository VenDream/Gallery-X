/**
 * 我的资料组件
 * @author VenDream
 * @since 2018-4-25
 */

import React, { Component } from 'react';
import classnames from 'classnames';

import './profile.less';

interface ProfileProps {
  user: UserModel;
  logout: () => Promise<void>;
}

export default class Profile extends Component<ProfileProps> {
  render() {
    return <div className="profile">我的资料</div>;
  }
}
