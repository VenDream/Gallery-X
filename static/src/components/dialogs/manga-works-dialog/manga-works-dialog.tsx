/**
 * 用户漫画作品弹窗
 * @author VenDream
 * @since 2018-12-25
 */

import React from 'react';
import popUpFactory from 'components/hoc/popup';

import SelfDialog from '.';
import { BaseDialog } from 'components/dialogs/base-dialog';
import MangaWorks from 'components/user-profile-detail/manga-works';
import './manga-works-dialog.less';

class MangaWorksDialog extends BaseDialog {
  componentDidMount() {
    const { id } = this.props;
    if (!id) {
      throw new Error('[Error] paramter [id] is required.');
    }

    this.setState({
      class: 'manga-works-dialog',
      title: '所有漫画作品',
      content: <MangaWorks userId={id} previewMode={false} />,
      close: SelfDialog.hide,
    });
  }
}

export default popUpFactory(MangaWorksDialog, false);
