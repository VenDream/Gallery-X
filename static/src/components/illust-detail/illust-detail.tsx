/**
 * 插画详情组件
 * @author VenDream
 * @since 2018-11-29
 */

import React, { Component } from 'react';
import iScroll from 'iscroll/build/iscroll';
import ReactIScroll from 'react-iscroll';
import autobind from 'autobind-decorator';

import { isMobile } from 'utils/common';

import TitleBar from './title-bar';
import LikeBtn from './like-btn';
import ImageList from './image-list';
import DetailInfo from './detail-info';
import ArtistInfo from './artist-info';
import CommentBox from './comment-box';
import './illust-detail.less';

interface IProps {
  /**
   * 插画ID
   */
  id: string;
  /**
   * 插画具体数据
   */
  illust: IllustModel;
  /**
   * 添加插画
   */
  addIllust: (illusts: IllustModel[]) => void;
  /**
   * 收藏插画
   */
  like: (illustId: string) => void;
  /**
   * 取消收藏插画
   */
  unlike: (illustId: string) => void;
  /**
   * 关注用户
   */
  follow: (userId: string) => void;
  /**
   * 取消关注用户
   */
  unfollow: (userId: string) => void;
}
interface IState {}

export default class IllustDetail extends Component<IProps, IState> {
  // React-iScroll组件引用
  reactIScrollRef: React.RefObject<any> = React.createRef();
  // iScroll配置，参考: https://github.com/cubiq/iscroll#configuring-the-iscroll
  iScrollOptions: IScorllOptions2 = {
    // 显示滚动条
    scrollbars: true,
    // 自动隐藏滚动条
    // fadeScrollbars: true,
    // 鼠标滚轮控制
    mouseWheel: !isMobile(),
    // 滚轮滚动速度
    mouseWheelSpeed: 1,
    // 减速因子
    deceleration: 0.00005,
    // 回弹时间
    bounceTime: 600,
    // 回弹缓动函数
    bounceEasing: 'quadratic',
  };

  componentDidMount() {
    // See: https://github.com/cubiq/iscroll/issues/1130
    document.addEventListener('touchstart', this.preventDefault, {
      passive: false,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.preventDefault);
  }

  preventDefault(e: TouchEvent) {
    e.preventDefault();
  }

  @autobind
  refreshIScroll() {
    const iScorller: IScroll = this.reactIScrollRef.current.getIScroll();
    iScorller && iScorller.refresh();
  }

  render() {
    const { illust, addIllust, like, unlike, follow, unfollow } = this.props;

    return (
      <div className="illust-detail">
        <TitleBar illust={illust} />
        <ReactIScroll
          ref={this.reactIScrollRef}
          iScroll={iScroll}
          options={this.iScrollOptions}
        >
          <div className="detail-content">
            <ImageList illust={illust} refreshIScroll={this.refreshIScroll} />
            <DetailInfo illust={illust} />
            <ArtistInfo
              artist={illust.user}
              addIllust={addIllust}
              follow={follow}
              unfollow={unfollow}
              refreshIScroll={this.refreshIScroll}
            />
            <CommentBox
              illustId={illust.id}
              refreshIScroll={this.refreshIScroll}
            />
          </div>
        </ReactIScroll>
        <LikeBtn
          illustId={illust.id}
          hasLiked={illust.isBookmarked}
          like={like}
          unlike={unlike}
        />
      </div>
    );
  }
}
