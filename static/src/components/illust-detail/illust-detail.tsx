/**
 * 插画详情组件
 * @author VenDream
 * @since 2018-9-30
 */

import React, { Component } from 'react';

import TitleBar from './title-bar';
import ImageList from './image-list';
import DetailInfo from './detail-info';
import ArtistInfo from './artist-info';
import './illust-detail.less';

interface IProps {
  /**
   * 插画ID
   */
  id: string;
  /**
   * 插画具体数据
   */
  illust: IllustModel;
}
interface IState {}

export default class IllustDetail extends Component<IProps, IState> {
  render() {
    const { illust } = this.props;
    return (
      <div className="illust-detail">
        <TitleBar illust={illust} />
        <div className="detail-content">
          <ImageList illust={illust} />
          <DetailInfo illust={illust} />
          <ArtistInfo artist={illust.user} />
        </div>
      </div>
    );
  }
}
