/**
 * 用户插画作品弹窗
 * @author VenDream
 * @since 2018-12-25
 */

import React from 'react';
import popUpFactory from 'components/hoc/popup';

import SelfDialog from '.';
import { BaseDialog } from 'components/dialogs/base-dialog';
import IllustWorks from 'components/user-profile-detail/illust-works';
import './illust-works-dialog.less';

class IllustWorksDialog extends BaseDialog {
  componentDidMount() {
    super.componentDidMount();

    const { id } = this.props;
    if (!id) {
      throw new Error('[Error] paramter [id] is required.');
    }

    this.setState({
      class: 'illust-works-dialog',
      title: '所有插画作品',
      content: <IllustWorks userId={id} previewMode={false} />,
      close: SelfDialog.hide,
    });
  }
}

export default popUpFactory(IllustWorksDialog, false);
