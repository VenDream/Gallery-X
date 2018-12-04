/**
 * 插画评论列表弹窗
 * @author VenDream
 * @since 2018-12-3
 */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import popUpFactory from 'components/hoc/popup';

import CommentDialog from 'components/common/comment-dialog';
import CommentBox from 'components/illust-detail/comment-box';
import './comment-dialog.less';

interface IProps {
  /**
   * 插画ID
   */
  id: string;
}

class IllustDetailDialog extends Component<IProps> {
  @autobind
  hide() {
    CommentDialog.hide();
  }

  render() {
    const { id } = this.props;

    return id ? (
      <div className="comment-dialog fade-in-right">
        <div className="dialog-title">
          <h3>所有评论</h3>
          <span className="close-btn" onClick={this.hide}>
            <i className="g-icon icon-close" />
          </span>
        </div>
        <div className="dialog-body">
          <CommentBox illustId={id} previewMode={false} />
        </div>
      </div>
    ) : null;
  }
}

export default popUpFactory(IllustDetailDialog);
