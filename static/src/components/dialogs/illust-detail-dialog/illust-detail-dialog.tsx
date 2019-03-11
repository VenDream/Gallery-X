/**
 * 作品详情弹窗
 * @author VenDream
 * @since 2019-2-15
 */

import React from 'react';

import SelfDialog from '.';
import popUpFactory from 'components/hoc/popup';
import IllustDetail from 'containers/illust-detail';
import { BaseDialog } from 'components/dialogs/base-dialog';
import './illust-detail-dialog.less';

class IllustDetailDialog extends BaseDialog {
  componentDidMount() {
    super.componentDidMount();

    const { id, popupInstanceId } = this.props;
    if (!id) {
      throw new Error('[Error] paramter [id] is required.');
    }

    this.setState({
      class: 'illust-detail-dialog',
      title: '',
      content: <IllustDetail id={id} popupInstanceId={popupInstanceId} />,
      close: SelfDialog.hide,
    });
  }
}

export default popUpFactory(IllustDetailDialog, false);
