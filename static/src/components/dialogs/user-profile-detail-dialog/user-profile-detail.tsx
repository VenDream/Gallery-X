/**
 * 用户个人资料详情
 * @author VenDream
 * @since 2018-12-10
 */

import React, { Component } from 'react';

import './user-profile-detail.less';

interface IProps {
  userId: string;
}

export default class UserProfileDetail extends Component<IProps> {
  render() {
    return <div className="user-profile-detail">用户个人资料详情</div>;
  }
}
