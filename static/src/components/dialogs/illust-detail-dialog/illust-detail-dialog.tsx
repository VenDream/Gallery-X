/**
 * 作品详情弹窗
 * @author VenDream
 * @since 2018-12-10
 */

import React from 'react';
import store from 'store';

import SelfDialog from '.';
import popUpFactory from 'components/hoc/popup';
import IllustDetail from 'containers/illust-detail';
import { BaseDialog } from 'components/dialogs/base-dialog';
import './illust-detail-dialog.less';

class IllustDetailDialog extends BaseDialog {
  componentDidMount() {
    const { id } = this.props;
    if (!id) {
      throw new Error('[Error] paramter [id] is required.');
    }

    this.setState({
      class: 'illust-detail-dialog',
      title: '',
      content: <IllustDetail id={id} store={store} />,
      close: SelfDialog.hide,
    });
  }
}

export default popUpFactory(IllustDetailDialog);
