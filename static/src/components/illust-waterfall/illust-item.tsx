/**
 * 插画瀑布流单项组件
 * @author VenDream
 * @since 2018-12-6
 */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import Image from 'components/common/image';
import IllustDetailDialog from 'components/common/illust-detail-dialog';
import './illust-item.less';

interface IllustItemProps {
  /**
   * 插画ID
   */
  id: string;
  /**
   * 插画预览缩略图
   */
  thumb: string;
  /**
   * 插画总数
   */
  total: number;
}

export default class IllustItem extends Component<IllustItemProps> {
  @autobind
  showIllustDetail() {
    IllustDetailDialog.show({
      id: this.props.id,
      transitionClass: 'fade-in-right',
    });
  }

  render() {
    return (
      <div
        className="illust-item zoom-in"
        data-id={this.props.id}
        onClick={this.showIllustDetail}
      >
        <Image src={this.props.thumb} className="thumb" />
        <div className="total">{this.props.total}</div>
      </div>
    );
  }
}
