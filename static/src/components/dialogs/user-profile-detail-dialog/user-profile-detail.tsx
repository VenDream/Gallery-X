/**
 * 用户个人资料详情
 * @author VenDream
 * @since 2018-12-18
 */

import React, { Component } from 'react';

import { getUserProfileDetail } from 'api/user';
import Message from 'components/common/message';
import Avatar from './avatar';
import Profile from './profile';
import Workspace from './workspace';
import './user-profile-detail.less';

interface IProps {
  /**
   * 用户ID
   */
  userId: string;
}
interface IState {
  /**
   * 是否正在加载
   */
  isLoading: boolean;
  /**
   * 个人资料
   */
  profileDetail?: UserProfileDetailModel;
}

export default class UserProfileDetail extends Component<IProps, IState> {
  state: IState = {
    isLoading: false,
  };

  componentDidMount() {
    this.fetchProfileDetail();
  }

  // 获取个人资料
  async fetchProfileDetail() {
    const { userId } = this.props;

    try {
      this.setState({ isLoading: true });
      const resp = await getUserProfileDetail(userId);
      if (resp) {
        const profileDetail: UserProfileDetailModel = resp.profileDetail;
        this.setState({ profileDetail });
      } else {
        Message.show({ type: 3, message: '获取用户个人资料失败，请重试' });
      }
      this.setState({ isLoading: false });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { isLoading, profileDetail } = this.state;

    return (
      <div className="user-profile-detail">
        {isLoading ? (
          <div className="loading-mask">
            <span className="loading-icon rotate">
              <i className="g-icon icon-rotate" />
            </span>
            <span className="loading-text">加载中...</span>
          </div>
        ) : profileDetail ? (
          <div className="profile-data">
            <Avatar profileDetail={profileDetail} />
            <Profile profileDetail={profileDetail} />
            <Workspace profileDetail={profileDetail} />
          </div>
        ) : null}
      </div>
    );
  }
}
