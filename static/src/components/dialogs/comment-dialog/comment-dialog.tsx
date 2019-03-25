/**
 * 插画评论列表弹窗
 * @author VenDream
 * @since 2019-3-25
 */

import React from 'react';
import store from 'store';
import popUpFactory from 'components/hoc/popup';

import SelfDialog from '.';
import { BaseDialog } from 'components/dialogs/base-dialog';
import CommentBox from 'components/illust-detail/comment-box';
import './comment-dialog.less';

class CommentDialog extends BaseDialog {
  componentDidMount() {
    super.componentDidMount();

    const { id } = this.props;
    if (!id) {
      throw new Error('[Error] paramter [id] is required.');
    }

    const illustState = store.getState().illust;
    const { activeId, byId } = illustState;
    const authorId = byId[activeId].user;

    this.setState({
      class: 'comment-dialog',
      title: '所有评论',
      content: (
        <CommentBox illustId={id} authorId={authorId} previewMode={false} />
      ),
      close: SelfDialog.hide,
    });
  }
}

export default popUpFactory(CommentDialog, false);
