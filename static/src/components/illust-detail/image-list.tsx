/**
 * 插画详情-图片列表组件
 * @author VenDream
 * @since 2018-11-28
 */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import Image from 'components/common/image';
import './image-list.less';

interface IProps {
  /**
   * 插画数据
   */
  illust: IllustModel;
  /**
   * 刷新IScroll
   */
  refreshIScroll: () => void;
}

export default class ImageList extends Component<IProps> {
  /**
   * 处理图片加载，动态调节高度
   *
   * @param {HTMLImageElement} image 图片节点
   * @memberof ImageList
   */
  @autobind
  handleImageLoaded(image: HTMLImageElement) {
    if (!image) return;
    const { naturalWidth, naturalHeight } = image;
    const ratio = naturalHeight / naturalWidth;
    const wrapper = image.parentNode as HTMLElement;
    wrapper && (wrapper.style.paddingBottom = `${ratio * 100}%`);

    // 非第一张图片加载完成后，刷新iScroll
    if (image.src === this.props.illust.imageUrls[0].large) return;
    this.props.refreshIScroll();
  }

  render() {
    const { id, width, height, imageUrls } = this.props.illust;
    return (
      <div className="image-list">
        {imageUrls.map((imageUrl, idx) => {
          const preRatio = idx === 0 ? height / width : 1;
          return (
            <Image
              src={imageUrl.large}
              key={`${id}_${idx + 1}`}
              style={{ paddingBottom: `${preRatio * 100}%` }}
              onImageLoaded={this.handleImageLoaded}
            />
          );
        })}
      </div>
    );
  }
}
