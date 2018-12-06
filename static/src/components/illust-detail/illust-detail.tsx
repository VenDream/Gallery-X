/**
 * 插画详情组件
 * @author VenDream
 * @since 2018-12-6
 */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import BScroll, { BsOption } from 'better-scroll';

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
  // better-scroll实例
  bScroller: BScroll | null = null;
  // 根节点引用
  rootRef: React.RefObject<HTMLDivElement> = React.createRef();
  // better-scroll配置，参考: https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html
  bScrollOption: Partial<BsOption> = {
    // 回弹效果
    bounce: {
      top: true,
      bottom: true,
    },
    bounceTime: 500,
    // 滚动条
    scrollbar: { fade: true },
    // 允许鼠标滚轮控制
    mouseWheel: true,
  };

  componentDidMount() {
    const root = this.rootRef.current;
    if (root) {
      // See: https://github.com/cubiq/iscroll/issues/1130
      root.addEventListener('touchstart', this.preventDefault, {
        passive: false,
      });

      // 初始化 better-scroll
      const wrapper = root.querySelector('.bscroll-wrapper');
      wrapper &&
        (this.bScroller = new BScroll(
          root.querySelector('.bscroll-wrapper'),
          this.bScrollOption
        ));
    }
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
  refreshBScroll() {
    this.bScroller && this.bScroller.refresh();
  }

  render() {
    const { redirectTo, searchByTag } = this.props;
    const { illust, addIllust, like, unlike, follow, unfollow } = this.props;

    return (
      <div className="illust-detail" ref={this.rootRef}>
        <TitleBar illust={illust} />
        <div className="bscroll-wrapper">
          <div className="detail-content">
            <ImageList illust={illust} refreshBScroll={this.refreshBScroll} />
            <DetailInfo
              illust={illust}
              redirectTo={redirectTo}
              searchByTag={searchByTag}
            />
            <ArtistInfo
              follow={follow}
              unfollow={unfollow}
              artist={illust.user}
              addIllust={addIllust}
              refreshBScroll={this.refreshBScroll}
            />
            <CommentBox
              previewMode={true}
              illustId={illust.id}
              refreshBScroll={this.refreshBScroll}
            />
          </div>
        </div>
        <LikeBtn
          illustId={illust.id}
          like={like}
          unlike={unlike}
          hasLiked={illust.isBookmarked}
        />
      </div>
    );
  }
}
