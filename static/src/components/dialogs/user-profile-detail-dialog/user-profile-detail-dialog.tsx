/**
 * 用户个人资料详情弹窗
 * @author VenDream
 * @since 2018-12-10
 */

import React, { Component } from 'react';
import popUpFactory from 'components/hoc/popup';

import './user-profile-detail-dialog.less';

interface IProps {
  /**
   * 用户ID
   */
  userId: string;
  /**
   * 类名
   */
  className?: string;
}

class UserProfileDetailDialog extends Component<IProps> {
  render() {
    const { userId, className } = this.props;

    return userId ? (
      <div className={`${className} user-profile-detail-dialog`}>
        <div>哈哈</div>
      </div>
    ) : null;
  }
}

export default popUpFactory(UserProfileDetailDialog);
