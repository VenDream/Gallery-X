/**
 * 增强图片组件，支持图片预加载
 * @author VenDream
 * @since 2019-5-21
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import autobind from 'autobind-decorator';

import './image.less';

const DEFAULT_PLACEHOLADER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';

interface ImageProps {
  /**
   * 图片源地址
   */
  src: string;
  /**
   * 图片别名
   */
  alt?: string;
  /**
   * 图片加载时的临时地址
   */
  placeholder?: string;
  /**
   * 过渡效果类
   */
  transitionClass?: string;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: Record<string, any>;
  /**
   * 图片点击回调
   */
  onClick?: (...args: any[]) => void;
  /**
   * 图片加载失败回调
   */
  onImageLoadError?: (image?: HTMLImageElement) => void;
  /**
   * 图片加载成功回调
   */
  onImageLoaded?: (image?: HTMLImageElement) => void;
}

interface ImageState {
  /**
   * 是否已加载完成
   */
  loaded: boolean;
  /**
   * 过渡效果类
   */
  transitionClass: string;
}

export default class Image extends Component<ImageProps, ImageState> {
  static defaultProps: ImageProps = {
    src: '',
    alt: '',
    placeholder: DEFAULT_PLACEHOLADER,
    transitionClass: 'fade-in',
  };

  // img节点引用
  image: React.RefObject<HTMLImageElement> = React.createRef();

  state: ImageState = {
    loaded: false,
    transitionClass: '',
  };

  @autobind
  handleClick() {
    this.props.onClick && this.props.onClick();
  }

  @autobind
  handleImageLoaded() {
    const { transitionClass } = this.props;
    this.setState({ loaded: true, transitionClass });
    this.props.onImageLoaded && this.props.onImageLoaded(this.image.current);
  }

  @autobind
  handleImageError() {
    console.warn('图片加载失败');
    this.props.onImageLoadError &&
      this.props.onImageLoadError(this.image.current);
  }

  render() {
    const { alt, src, className, placeholder, style } = this.props;
    const containerClass = classnames(
      'g-image',
      className,
      this.state.transitionClass
    );

    if (!src) return null;

    return (
      <div className={containerClass} style={style} onClick={this.handleClick}>
        <img
          src={src}
          alt={alt}
          ref={this.image}
          className="original"
          onLoad={this.handleImageLoaded}
          onError={this.handleImageError}
        />
        {!this.state.loaded && (
          <img src={placeholder} className="placeholder" />
        )}
      </div>
    );
  }
}
