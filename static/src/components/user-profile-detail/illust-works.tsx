/**
 * 用户插画作品
 * @author VenDream
 * @since 2018-12-25
 */

import React, { Component } from 'react';

import { addIllust } from 'utils/action';
import { getUserIllusts } from 'api/user';
import { checkIllustDetail, checkUserIllusts } from 'components/helpers/common';
import Image from 'components/common/image';
import Message from 'components/common/message';
import './user-works.less';
import './illust-works.less';

interface IProps {
  /**
   * 用户ID
   */
  userId: string;
  /**
   * 作品总数
   */
  total?: number;
  /**
   * 预览模式
   */
  previewMode?: boolean;
}
interface IState {
  /**
   * 是否已加载所有记录
   */
  isEnd: boolean;
  /**
   * 请求参数
   */
  reqOption: {
    start: number;
    step: number;
  };
  /**
   * 是否正在请求
   */
  isLoading: boolean;
  /**
   * 作品列表
   */
  works: IllustModel[];
}

export default class IllustWorks extends Component<IProps, IState> {
  // 标题说明
  caption: string = '插画作品';
  // 类名
  className: string = 'illust-works';
  // 查看更多弹窗
  checkMore: (userId: string) => void = checkUserIllusts;

  state: IState = {
    isEnd: false,
    reqOption: { start: 0, step: 30 },
    isLoading: false,
    works: [],
  };

  componentDidMount() {
    this.fetchUserWorks();
  }

  // 获取用户插画作品列表
  async fetchUserWorks() {
    const { start, step } = this.state.reqOption;
    const { userId, previewMode } = this.props;
    // 预览模式下只取前6条数据进行展示
    let reqOpt = { start, step };
    if (previewMode) reqOpt = { start: 0, step: 6 };

    try {
      this.setState({ isLoading: true });
      const resp = await (getUserIllusts(
        userId,
        reqOpt.start,
        reqOpt.step
      ) as CancelablePromise).promise;
      if (resp) {
        const illusts = resp.illusts as IllustModel[];
        const newWorks = this.state.works.concat(illusts);
        this.setState(prevState => ({
          ...prevState,
          isEnd: !!resp.isEnd,
          reqOption: { ...prevState.reqOption, start: newWorks.length },
          works: newWorks,
        }));
        addIllust(illusts);
      } else {
        Message.show({ type: 3, message: '用户作品获取失败，请重试' });
      }
      this.setState({ isLoading: false });
    } catch (err) {
      console.error(err);
    }
  }

  // 获取作品图片列表
  getWorksList() {
    const worksList = [];
    const { works: illusts } = this.state;

    illusts.forEach((illust, idx) => {
      const style: React.CSSProperties = {
        marginLeft: idx % 3 === 0 ? 0 : '0.08rem',
      };
      worksList.push(
        <li
          className="work-item fade-in"
          key={illust.id}
          style={style}
          onClick={() => checkIllustDetail(illust.id)}
        >
          <Image src={illust.imageUrls[0].medium} />
        </li>
      );
    });

    return <ul className="works-list">{worksList}</ul>;
  }

  // 渲染预览模式下的头部
  renderPreviewHeader() {
    const { total, userId } = this.props;

    return (
      <div className="iw-header">
        <h4>{this.caption}</h4>
        <span className="total" onClick={() => this.checkMore(userId)}>
          {total || 0}件作品<span className="linker">&gt;</span>
        </span>
      </div>
    );
  }

  // 渲染预览模式下的部分预览
  renderPreviewBody() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <span className="loading-tips">数据加载中...</span>;
    } else {
      return this.getWorksList();
    }
  }

  // 渲染作品列表
  renderWorksList() {
    return this.getWorksList();
  }

  // 渲染loader
  renderLoader() {
    const { isEnd, isLoading } = this.state;
    const content = isEnd ? (
      <p className="end">已加载所有作品</p>
    ) : isLoading ? (
      <button className="loading">
        <span className="rotate">
          <i className="g-icon icon-loading" />
        </span>
        正在加载...
      </button>
    ) : (
      <button className="load-more" onClick={() => this.fetchUserWorks()}>
        查看更多
      </button>
    );
    return <div className="works-loader">{content}</div>;
  }

  render() {
    const { previewMode } = this.props;

    return (
      <div className={`user-works ${this.className}`}>
        {previewMode ? (
          <div className="preview">
            {this.renderPreviewHeader()}
            {this.renderPreviewBody()}
          </div>
        ) : (
          <div className="content">
            {this.renderWorksList()}
            {this.renderLoader()}
          </div>
        )}
      </div>
    );
  }
}
