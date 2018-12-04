/**
 * 插画详情-详细信息组件
 * @author VenDream
 * @since 2018-12-4
 */

import React, { Component } from 'react';
import moment from 'moment';
import autobind from 'autobind-decorator';

import PAGE from 'constants/page';
import RouterMap from 'constants/routers';
import IllustDetailDialog from 'components/common/illust-detail-dialog';
import './detail-info.less';

interface IProps {
  /**
   * 插画数据
   */
  illust: IllustModel;
  /**
   * 通过标签搜索插画
   */
  searchByTag: (tag: string) => void;
  /**
   * 路由重定向
   */
  redirectTo: (path: string) => void;
}

export default class DetailInfo extends Component<IProps> {
  @autobind
  handleClickTag(tag: string) {
    const searchPagePath = RouterMap[PAGE.SEARCH].path;
    // 关闭作品详情弹窗
    IllustDetailDialog.hide();
    // 重定向到搜索页
    this.props.redirectTo(searchPagePath);
    // 设定标签为关键词，开始搜索
    this.props.searchByTag(tag);
  }

  // 渲染插画统计数据
  renderStatistic() {
    const { illust } = this.props;
    return (
      <div className="statistic">
        <span className="create-date">
          {moment(illust.createDate).format('YYYY-MM-DD HH:mm:ss')}
        </span>
        <span className="total-view">
          <span className="data-value">{illust.totalView}</span>
          <span className="data-key">阅读量</span>
        </span>
        <span className="total-like">
          <span className="data-value">{illust.totalBookmarks}</span>
          <span className="data-key">喜欢!</span>
        </span>
      </div>
    );
  }

  // 渲染插画标签
  renderTags() {
    const tags = this.props.illust.tags;

    return (
      <div className="tags">
        {tags.split(';').map((tag, idx) => (
          <span
            key={idx}
            className="tag"
            onClick={() => this.handleClickTag(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }

  // 渲染插画说明
  renderCaption() {
    const illust = this.props.illust;
    return (
      <div
        className="caption"
        dangerouslySetInnerHTML={{ __html: illust.caption }}
      />
    );
  }

  render() {
    return (
      <div className="detail-info">
        {this.renderStatistic()}
        {this.renderTags()}
        {this.renderCaption()}
      </div>
    );
  }
}
