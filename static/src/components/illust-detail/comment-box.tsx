/**
 * 插画评论组件
 * @author VenDream
 * @since 2018-12-10
 */

import React, { Component } from 'react';
import moment from 'moment';
import autobind from 'autobind-decorator';

import Image from 'components/common/image';
import Message from 'components/common/message';
import CommentDialog from 'components/dialogs/comment-dialog';
import { getComments, getCommentReplies } from 'api/illust';
import { parseCommentStr } from 'components/helpers/comment';
import './comment-box.less';

interface IProps {
  /**
   * 插画ID
   */
  illustId: string;
  /**
   * 预览模式
   */
  previewMode?: boolean;
  /**
   * 刷新better-scroll
   */
  refreshBScroll?: () => void;
}

interface IState {
  /**
   * 是否已加载所有数据
   */
  isEnd: boolean;
  /**
   * 是否正在请求评论数据
   */
  isFetchingComment: boolean;
  /**
   * 最后一条已加载的评论ID
   */
  lastCommentId: string;
  /**
   * 评论数据
   */
  comments: CommentModel[];
  /**
   * 评论回复
   */
  replies: {
    [commentId: string]: { isFetching: boolean; replies: CommentModel[] };
  };
}

export default class CommentBox extends Component<IProps, IState> {
  static defaultProps: IProps = {
    illustId: '',
    previewMode: false,
    refreshBScroll: () => {},
  };

  state: IState = {
    isEnd: false,
    isFetchingComment: false,
    lastCommentId: '',
    comments: [],
    replies: {},
  };

  componentDidMount() {
    setTimeout(() => {
      this.fetchCommentData();
    }, 200);
  }

  /**
   * 获取评论数据
   *
   * @returns
   * @memberof CommentBox
   */
  @autobind
  async fetchCommentData() {
    const { illustId } = this.props;
    const { isEnd, lastCommentId, isFetchingComment } = this.state;

    if (isEnd || isFetchingComment) return;

    try {
      this.setState({ isFetchingComment: true });
      const resp = await getComments(illustId, lastCommentId);
      if (resp) {
        const { isEnd, lastCommentId } = resp;
        const comments = resp.comments as CommentModel[];
        const replies: Record<string, any> = {};
        // 初始化评论回复对象
        for (const comment of comments) {
          replies[comment.id] = { isFetching: false, replies: [] };
        }
        this.setState(
          prevState => ({
            isEnd,
            lastCommentId,
            comments: prevState.comments.concat(comments),
            replies: {
              ...prevState.replies,
              ...replies,
            },
          }),
          () => {
            comments.length && this.props.refreshBScroll();
          }
        );
      } else {
        Message.show({ type: 3, message: '评论获取失败，请重试' });
      }
      this.setState({ isFetchingComment: false });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * 获取评论回复数据
   *
   * @param {string} commentId 评论ID
   * @memberof CommentBox
   */
  async fetchRepliesData(commentId: string) {
    const { replies } = this.state;
    const reply = replies[commentId];

    if (!reply || reply.isFetching) return;

    try {
      this.updateCommentReply(commentId, { isFetching: true });

      const resp = await getCommentReplies(commentId);
      if (resp) {
        const replies: CommentModel[] = resp.replies;
        this.updateCommentReply(
          commentId,
          { isFetching: false, replies: replies.reverse() },
          () => replies.length && this.props.refreshBScroll()
        );
      } else {
        Message.show({ type: 3, message: '回复获取失败，请重试' });
      }

      this.updateCommentReply(commentId, { isFetching: false });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * 更新评论回复状态
   *
   * @param {string} commentId 评论ID
   * @param {Partial<{ isFetching: boolean; replies: CommentModel[] }>} patch 更新数据
   * @param {() => void} [callback] 更新后的回调操作
   * @returns
   * @memberof CommentBox
   */
  updateCommentReply(
    commentId: string,
    patch: Partial<{ isFetching: boolean; replies: CommentModel[] }>,
    callback?: () => void
  ) {
    const { replies } = this.state;
    if (!replies[commentId]) return;

    this.setState(
      prevState => {
        const prevReply = prevState.replies[commentId];
        return {
          replies: {
            ...prevState.replies,
            [commentId]: { ...prevReply, ...patch },
          },
        };
      },
      () => callback && callback()
    );
  }

  /**
   * 唤起评论列表独立弹窗
   *
   * @memberof CommentBox
   */
  @autobind
  showCommentDialog() {
    const { illustId } = this.props;
    CommentDialog.show({ id: illustId, transitionClass: 'fade-in-right' });
  }

  // 渲染评论列表
  renderCommentList() {
    const { previewMode } = this.props;
    const { isEnd, comments } = this.state;

    // 没有评论数据
    if (isEnd && !comments.length) return <p className="empty">暂无评论</p>;
    // 评论列表(预览模式下只展示前两条)
    const commentList = (previewMode ? comments.slice(0, 2) : comments).map(
      comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          renderReplies={this.renderReplies}
        />
      )
    );

    return <div className="comment-list">{commentList}</div>;
  }

  /**
   * 渲染评论回复
   *
   * @param {CommentModel} comment 评论
   * @memberof CommentBox
   */
  @autobind
  renderReplies(comment: CommentModel) {
    const { id, hasReplies } = comment;
    const { replies } = this.state;

    // 没有评论回复
    if (!hasReplies || !replies[id]) return null;

    const { isFetching, replies: repliesData } = replies[id];
    const hasFetchedReplies = repliesData && repliesData.length;
    const content = isFetching ? (
      <button className="loading">
        <span className="rotate">
          <i className="g-icon icon-loading" />
        </span>
      </button>
    ) : hasFetchedReplies ? (
      repliesData.map(reply => <CommentItem key={reply.id} comment={reply} />)
    ) : (
      <button onClick={this.fetchRepliesData.bind(this, id)}>查看回复</button>
    );

    return <div className="comment-replies">{content}</div>;
  }

  // 渲染加载更多按钮
  renderLoadMoreBtn() {
    const { previewMode } = this.props;
    const { isEnd, comments, lastCommentId, isFetchingComment } = this.state;
    // 预览模式下只展示前两条数据
    const showPreview = previewMode && comments.length > 2;

    // 没有评论数据
    if (isEnd && !lastCommentId) return null;

    const content = showPreview ? (
      <button className="open-dialog" onClick={this.showCommentDialog}>
        查看更多 &gt;
      </button>
    ) : isEnd ? (
      <p className="end">已加载所有评论</p>
    ) : isFetchingComment ? (
      <button className="loading">
        <span className="rotate">
          <i className="g-icon icon-loading" />
        </span>
        正在加载...
      </button>
    ) : (
      <button className="load-more" onClick={this.fetchCommentData}>
        查看更多
      </button>
    );

    return <div className="comment-loader">{content}</div>;
  }

  render() {
    return (
      <div className="comment-box">
        {this.props.previewMode && <h3>评论</h3>}
        {this.renderCommentList()}
        {this.renderLoadMoreBtn()}
      </div>
    );
  }
}

/**
 * 单条评论详情组件
 *
 * @param {{
 *   comment: CommentModel;
 *   renderReplies?: (comment: CommentModel) => JSX.Element;
 * }} props props
 * @returns
 */
function CommentItem(props: {
  comment: CommentModel;
  renderReplies?: (comment: CommentModel) => JSX.Element;
}) {
  const { comment, renderReplies } = props;
  const { id, comment: content, date, user } = comment;
  const dateStr = moment(date).format('YYYY-MM-DD HH:mm');
  return (
    <div className="comment-item fade-in" key={id}>
      <div className="left-block">
        <Image src={user.avatar} className="user-avatar" />
      </div>
      <div className="right-block">
        <span className="user-name">{user.name}</span>
        <div className="content">{parseCommentStr(content)}</div>
        <span className="date">{dateStr}</span>
        {renderReplies && renderReplies(comment)}
      </div>
    </div>
  );
}
