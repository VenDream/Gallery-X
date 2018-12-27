/**
 * 用户收藏作品弹窗
 * @author VenDream
 * @since 2018-12-27
 */

import React from 'react';
import popUpFactory from 'components/hoc/popup';

import SelfDialog from '.';
import { BaseDialog } from 'components/dialogs/base-dialog';
import BookmarkIllusts from 'components/user-profile-detail/bookmark-illusts';
import './bookmark-illusts-dialog.less';

class BookmarkIllustsDialog extends BaseDialog {
  componentDidMount() {
    super.componentDidMount();

    const { id } = this.props;
    if (!id) {
      throw new Error('[Error] paramter [id] is required.');
    }

    this.setState({
      class: 'bookmark-illusts-dialog',
      title: '所有收藏作品',
      content: <BookmarkIllusts userId={id} previewMode={false} />,
      close: SelfDialog.hide,
    });
  }
}

export default popUpFactory(BookmarkIllustsDialog, false);
