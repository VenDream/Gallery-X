/**
 * 作品详情弹窗
 * @author VenDream
 * @since 2018-12-6
 */

import React, { Component } from 'react';
import popUpFactory from 'components/hoc/popup';

import store from 'store';
import IllustDetail from 'containers/illust-detail';
import './illust-detail-dialog.less';

interface IProps {
  /**
   * 插画ID
   */
  id: string;
  /**
   * 类名
   */
  className?: string;
}

class IllustDetailDialog extends Component<IProps> {
  render() {
    const { id, className } = this.props;

    return id ? (
      <div className={`${className} illust-detail-dialog`}>
        <IllustDetail id={this.props.id} store={store} />
      </div>
    ) : null;
  }
}

export default popUpFactory(IllustDetailDialog);
