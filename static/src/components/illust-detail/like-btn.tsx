/**
 * 收藏按钮组件
 * @author VenDream
 * @since 2018-11-26
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import autobind from 'autobind-decorator';

import Message from 'components/common/message';
import { like, unlike } from 'api/illust';

import './like-btn.less';

interface IProps {
  /**
   * 插画ID
   */
  illustId: string;
  /**
   * 是否已收藏
   */
  hasLiked: boolean;
  /**
   * 收藏插画
   */
  like: (illustId: string) => void;
  /**
   * 取消收藏插画
   */
  unlike: (illustId: string) => void;
}

interface IState {
  /**
   * 是否正在进行操作
   */
  isOperating: boolean;
}

export default class LikeBtn extends Component<IProps, IState> {
  state: IState = {
    isOperating: false,
  };

  /**
   * 切换插画收藏状态
   *
   * @returns
   * @memberof LikeBtn
   */
  @autobind
  async toggleLike() {
    const { isOperating } = this.state;
    const { illustId, hasLiked } = this.props;
    const likeReq = hasLiked ? unlike : like;
    const likeAction = hasLiked ? this.props.unlike : this.props.like;

    if (isOperating) return;

    try {
      this.setState({ isOperating: true });
      const data = await likeReq(illustId);
      if (data && +data.code === 200) {
        likeAction(illustId);
      } else {
        Message.show({ type: 3, message: '操作失败，请重试' });
      }
      this.setState({ isOperating: false });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { hasLiked } = this.props;
    const { isOperating } = this.state;
    const iconClass = classnames('g-icon', 'zoom-in', {
      'icon-like': !hasLiked,
      'icon-liked': hasLiked,
    });

    return (
      <div className="like-btn" onClick={this.toggleLike}>
        {isOperating ? (
          <span className="rotate">
            <i className="g-icon icon-loading" />
          </span>
        ) : (
          <i className={iconClass} />
        )}
      </div>
    );
  }
}
