/**
 * 插画详情-标题栏组件
 * @author VenDream
 * @since 2018-12-18
 */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import Image from 'components/common/image';
import IllustDetailDialog from 'components/dialogs/illust-detail-dialog';
import UserProfileDetailDialog from 'components/dialogs/user-profile-detail-dialog';
import './title-bar.less';

interface IProps {
  /**
   * 弹窗实例ID
   */
  popupInstanceId?: string;
  /**
   * 插画详细数据
   */
  illust: IllustModel;
}

export default class TitleBar extends Component<IProps> {
  @autobind
  close() {
    IllustDetailDialog.hide();
  }

  @autobind
  checkArtist() {
    const { id } = this.props.illust.user;
    UserProfileDetailDialog.show({ id, transitionClass: 'fade-in-right' });
  }

  render() {
    const { user, title } = this.props.illust;
    return (
      <div className="title-bar">
        <div className="left-block">
          <Image
            src={user.avatar}
            className="user-avatar"
            onClick={this.checkArtist}
          />
          <div className="name-title">
            <p className="username">{user.name}</p>
            <p className="illust-title" title={title}>
              {title}
            </p>
          </div>
        </div>
        <div className="right-block">
          <span className="close-btn" onClick={this.close}>
            <i className="g-icon icon-close" />
          </span>
        </div>
      </div>
    );
  }
}
