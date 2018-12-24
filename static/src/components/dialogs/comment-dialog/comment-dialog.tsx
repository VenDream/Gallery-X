/**
 * 插画评论列表弹窗
 * @author VenDream
 * @since 2018-12-24
 */

import React from 'react';
import popUpFactory from 'components/hoc/popup';

import SelfDialog from '.';
import { BaseDialog } from 'components/dialogs/base-dialog';
import CommentBox from 'components/illust-detail/comment-box';
import './comment-dialog.less';

class CommentDialog extends BaseDialog {
  componentDidMount() {
    const { id } = this.props;
    if (!id) {
      throw new Error('[Error] paramter [id] is required.');
    }

    this.setState({
      class: 'comment-dialog',
      title: '全部评论',
      content: <CommentBox illustId={id} previewMode={false} />,
      close: SelfDialog.hide,
    });
  }
}

export default popUpFactory(CommentDialog, false);
