/**
 * 我的资料组件
 * @author VenDream
 * @since 2018-6-14
 */

import React, { Component } from 'react';

import Image from 'components/common/image';
import './profile.less';

interface ProfileProps {
  user: UserModel;
  logout: () => Promise<void>;
}

function LabelItem(props: { label: string; value: string }) {
  return (
    <div className="label-item">
      <span className="label">{props.label}: </span>
      <span className="label-value">{props.value}</span>
    </div>
  );
}

export default class Profile extends Component<ProfileProps> {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { user } = this.props;
    const { profileImageUrls } = user;

    return (
      <div className="profile">
        <div className="profile-header">
          <Image
            src={profileImageUrls.px_170x170}
            alt="PROFILE"
            className="avatar"
          />
          <div className="account-info">
            <LabelItem label="PixivID" value={user.id} />
            <LabelItem label="Pixiv帐号" value={user.account} />
            <LabelItem label="昵称" value={user.name} />
          </div>
        </div>
        <div className="profile-body">
          <span className="logout-btn" onClick={this.handleLogout}>
            登出
          </span>
        </div>
      </div>
    );
  }
}
