/**
 * 插画详情-画师信息组件
 * @author VenDream
 * @since 2019-3-25
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import autobind from 'autobind-decorator';

import Image from 'components/common/image';
import Message from 'components/common/message';
import { getUserIllusts, follow, unfollow } from 'api/user';
import { checkUserDetail, checkIllustDetail } from 'components/helpers/common';
import './artist-info.less';

interface IProps {
  /**
   * 画师数据
   */
  artist: ArtistModel;
  /**
   * 添加插画
   */
  addIllust: (illusts: IllustModel[]) => void;
  /**
   * 关注用户
   */
  follow: (userId: string) => void;
  /**
   * 取消关注用户
   */
  unfollow: (userId: string) => void;
  /**
   * 刷新better-scroll
   */
  refreshBScroll: () => void;
}

interface IState {
  /**
   * 画师近期作品
   */
  illusts: IllustModel[];
  /**
   * 是否正在执行关注/取消关注操作
   */
  isOperating: boolean;
  /**
   * 是否正在加载画师作品
   */
  isLoadingIllusts: boolean;
}

export default class ArtistInfo extends Component<IProps, IState> {
  state: IState = {
    illusts: [],
    isOperating: false,
    isLoadingIllusts: false,
  };

  // 可取消promise队列
  cancelablePromises: CancelablePromise[] = [];

  componentDidMount() {
    this.fetchUserIllusts();
  }

  // 组件卸载时，取消正在进行的promise
  componentWillUnmount() {
    this.cancelablePromises.forEach(cp => cp.cancel());
  }

  // 请求画师作品数据
  async fetchUserIllusts() {
    const { id } = this.props.artist;

    try {
      this.setState({ isLoadingIllusts: true });
      // 获取数据并取前3个进行展示
      const userIllustsCP = getUserIllusts(id, 0, 3) as CancelablePromise;
      this.cancelablePromises.push(userIllustsCP);

      const data = await userIllustsCP.promise;
      if (data && data.illusts) {
        const illusts: IllustModel[] = (data.illusts || []).slice(0, 3);
        this.props.addIllust(illusts);
        this.setState({ illusts }, () => {
          setTimeout(() => {
            illusts.length && this.props.refreshBScroll();
          }, 0);
        });
      } else {
        Message.show({ type: 3, message: '网络错误，请刷新重试' });
      }
      this.setState({ isLoadingIllusts: false });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * 关注/取消关注
   *
   * @memberof ArtistInfo
   */
  @autobind
  async toggleFollow() {
    const { isOperating } = this.state;
    const { id, isFollowed } = this.props.artist;
    const followReq = isFollowed ? unfollow : follow;
    const followAction = isFollowed ? this.props.unfollow : this.props.follow;

    if (isOperating) return;

    try {
      this.setState({ isOperating: true });
      const data = await followReq(id);
      if (data && +data.code === 200) {
        followAction(id);
      } else {
        Message.show({ type: 3, message: '操作失败，请重试' });
      }
      this.setState({ isOperating: false });
    } catch (err) {
      console.error(err);
    }
  }

  // 渲染关注按钮
  renderFollowBtn() {
    const { isFollowed } = this.props.artist;
    const { isOperating } = this.state;
    const followBtnCls = classnames('follow-btn', {
      operating: isOperating,
      followed: !isOperating && isFollowed,
    });
    const followBtnContent = isOperating ? (
      <span className="rotate">
        <i className="g-icon icon-loading" />
      </span>
    ) : isFollowed ? (
      <span>已关注</span>
    ) : (
      <span>关注</span>
    );

    return (
      <button className={followBtnCls} onClick={this.toggleFollow}>
        {followBtnContent}
      </button>
    );
  }

  // 渲染近期作品
  renderRecentWorks() {
    const { illusts, isLoadingIllusts } = this.state;
    const hasWorks = illusts.length > 0;

    return isLoadingIllusts ? (
      <p className="loading-tips">正在获取近期作品...</p>
    ) : hasWorks ? (
      <ul className="works-list">
        {illusts.map((illust, idx) => (
          <li
            className="work-item"
            key={illust.id}
            onClick={() => checkIllustDetail(illust.id)}
            style={{ marginLeft: idx === 0 ? 0 : '0.08rem' }}
          >
            <Image src={illust.imageUrls[0].medium} />
          </li>
        ))}
      </ul>
    ) : (
      <p className="empty-tips">暂无作品</p>
    );
  }

  render() {
    const { id, name, avatar } = this.props.artist;

    return (
      <div className="artist-info">
        <div className="info">
          <div className="left-block">
            <Image
              src={avatar}
              className="artist-avatar"
              onClick={() => checkUserDetail(id)}
            />
            <p className="artist-name">{name}</p>
          </div>
          <div className="right-block">{this.renderFollowBtn()}</div>
        </div>
        <div className="recent-works">{this.renderRecentWorks()}</div>
      </div>
    );
  }
}
