/**
 * 用户个人资料详情弹窗
 * @author VenDream
 * @since 2018-12-10
 */

import React from 'react';
import popUpFactory from 'components/hoc/popup';

import SelfDialog from '.';
import UserProfileDetail from './user-profile-detail';
import { BaseDialog } from 'components/dialogs/base-dialog';
import './user-profile-detail-dialog.less';

class UserProfileDetailDialog extends BaseDialog {
  componentDidMount() {
    const { id } = this.props;
    if (!id) {
      throw new Error('[Error] paramter [id] is required.');
    }

    this.setState({
      class: 'user-profile-detail-dialog',
      title: '个人页面',
      content: <UserProfileDetail userId={id} />,
      close: SelfDialog.hide,
    });
  }
}

export default popUpFactory(UserProfileDetailDialog);
