/**
 * 插画瀑布流单项组件
 * @author VenDream
 * @since 2019-3-25
 */

import React, { Component } from 'react';

import Image from 'components/common/image';
import { checkIllustDetail } from 'components/helpers/common';
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
  render() {
    return (
      <div
        className="illust-item zoom-in"
        data-id={this.props.id}
        onClick={() => checkIllustDetail(this.props.id)}
      >
        <Image src={this.props.thumb} className="thumb" />
        <div className="total">{this.props.total}</div>
      </div>
    );
  }
}
