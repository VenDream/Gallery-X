/**
 * 插画详情-画师信息组件
 * @author VenDream
 * @since 2018-9-30
 */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import { getUserIllusts } from 'api/user';
import Image from 'components/common/image';
import './artist-info.less';

interface IProps {
  /**
   * 画师数据
   */
  artist: ArtistModel;
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

  componentDidMount() {
    this.fetchUserIllusts();
  }

  // 请求画师作品数据
  async fetchUserIllusts() {
    const { id } = this.props.artist;
    try {
      this.setState({ isLoadingIllusts: true });
      // 获取数据并取前3个进行展示
      const data = await getUserIllusts(id);
      if (data && data.illusts) {
        const illusts: IllustModel[] = data.illusts || [];
        this.setState({ illusts: illusts.slice(0, 3) });
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoadingIllusts: false });
    }
  }

  /**
   * 关注/取消关注
   *
   * @memberof ArtistInfo
   */
  @autobind
  follow() {
    const { isFollowed } = this.props.artist;
    console.log(isFollowed ? '取消关注' : '关注');
  }

  // 渲染近期作品
  renderRecentWorks() {
    const { illusts, isLoadingIllusts } = this.state;
    const hasWorks = illusts.length > 0;

    return isLoadingIllusts ? (
      <p className="loading-tips">正在获取近期作品...</p>
    ) : hasWorks ? (
      <div className="works-list">
        {illusts.map(illust => (
          <span className="work-item" key={illust.id}>
            <Image src={illust.imageUrls[0].medium} />
          </span>
        ))}
      </div>
    ) : (
      <p className="empty-tips">暂无作品</p>
    );
  }

  render() {
    const { id, name, avatar, isFollowed } = this.props.artist;
    return (
      <div className="artist-info" data-id={id}>
        <div className="info">
          <div className="left-block">
            <Image src={avatar} className="artist-avatar" />
            <p className="artist-name">{name}</p>
          </div>
          <div className="right-block">
            <button
              className={`follow-btn${isFollowed ? ' followed' : ''}`}
              onClick={this.follow}
            >
              {isFollowed ? '已关注' : '关注'}
            </button>
          </div>
        </div>
        <div className="recent-works">{this.renderRecentWorks()}</div>
      </div>
    );
  }
}
