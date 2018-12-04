/**
 * 插画详情组件
 * @author VenDream
 * @since 2018-12-4
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
import Message from 'components/common/message/';
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
  /**
   * 通过标签搜索插画
   */
  searchByTag: (tag: string) => void;
  /**
   * 路由重定向
   */
  redirectTo: (path: string) => void;
}
interface IState {}

export default class IllustDetail extends Component<IProps, IState> {
  // 根节点引用
  rootRef: React.RefObject<HTMLDivElement> = React.createRef();
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
    const root = this.rootRef.current;
    root &&
      root.addEventListener('touchstart', this.preventDefault, {
        passive: false,
      });
  }

  componentWillUnmount() {
    const root = this.rootRef.current;
    root && root.removeEventListener('touchstart', this.preventDefault);
  }

  preventDefault(e: TouchEvent) {
    const node = e.target as HTMLElement;

    // 超链接正常触发跳转
    if (node.nodeName === 'A') {
      const href = (node as HTMLAnchorElement).href;
      if (href) {
        const newWin = window.open('', '_blank');
        if (!newWin) {
          Message.show({
            type: 3,
            message: '弹窗已触发但被阻止了',
          });
        } else {
          setTimeout(() => {
            newWin.location.href = href;
          }, 100);
        }
      }
      return;
    }

    // 其他点击事件均屏蔽
    e.preventDefault();
  }

  @autobind
  refreshIScroll() {
    const iScorller: IScroll = this.reactIScrollRef.current.getIScroll();
    iScorller && iScorller.refresh();
  }

  render() {
    const { redirectTo, searchByTag } = this.props;
    const { illust, addIllust, like, unlike, follow, unfollow } = this.props;

    return (
      <div className="illust-detail" ref={this.rootRef}>
        <TitleBar illust={illust} />
        <ReactIScroll
          ref={this.reactIScrollRef}
          iScroll={iScroll}
          options={this.iScrollOptions}
        >
          <div className="detail-content">
            <ImageList illust={illust} refreshIScroll={this.refreshIScroll} />
            <DetailInfo
              illust={illust}
              searchByTag={searchByTag}
              redirectTo={redirectTo}
            />
            <ArtistInfo
              artist={illust.user}
              addIllust={addIllust}
              follow={follow}
              unfollow={unfollow}
              refreshIScroll={this.refreshIScroll}
            />
            <CommentBox
              previewMode={true}
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
