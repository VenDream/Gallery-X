/**
 * 用户个人资料详情 - 顶部头像模块
 * @author VenDream
 * @since 2018-12-18
 */

import React from 'react';
import Image from 'components/common/image';

import './avatar.less';

export default function Avatar(props: {
  profileDetail: UserProfileDetailModel;
}) {
  const { user } = props.profileDetail;
  return (
    <div className="profile-avatar">
      <div className="blur-bg">
        <Image className="bg-avatar" src={user.avatar} />
      </div>
      <div className="name-avatar">
        <Image className="user-avatar" src={user.avatar} />
        <p className="user-name">{user.name}</p>
      </div>
    </div>
  );
}
