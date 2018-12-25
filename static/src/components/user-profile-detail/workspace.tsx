/**
 * 用户个人资料详情 - 工作环境模块
 * @author VenDream
 * @since 2018-12-18
 */

import React, { Component } from 'react';

import './workspace.less';
import autobind from 'autobind-decorator';

// 中文映射
const keyMap = {
  pc: '所使用的电脑',
  monitor: '显示器',
  tool: '软件',
  scanner: '所使用的扫描仪',
  tablet: '数位板',
  mouse: '鼠标',
  printer: '打印机',
  desktop: '桌子上的东西',
  music: '绘画时所听的音乐',
  desk: '桌子',
  chair: '椅子',
  comment: '其他',
};

interface IProps {
  /**
   * 用户详情
   */
  profileDetail: UserProfileDetailModel;
}
interface IState {
  /**
   * 是否需要显示
   */
  shouldShow: boolean;
  /**
   * 是否展开更多
   */
  isExpanding: boolean;
}

export default class Workspace extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { workspace } = props.profileDetail;
    const { pc, monitor, tool, scanner, tablet, mouse } = workspace;
    const { printer, desktop, music, desk, chair, comment } = workspace;
    const shouldShow = !!(
      pc ||
      monitor ||
      tool ||
      scanner ||
      tablet ||
      mouse ||
      printer ||
      desktop ||
      music ||
      desk ||
      chair ||
      comment
    );
    this.state = { shouldShow, isExpanding: false };
  }

  @autobind
  showMore() {
    this.setState({ isExpanding: true });
  }

  renderWorkspaceList() {
    const itemList = [];
    const { isExpanding } = this.state;
    const { workspace } = this.props.profileDetail;

    Object.keys(workspace).forEach(key => {
      keyMap[key] &&
        workspace[key] &&
        itemList.push(
          <li className="workspace-item" key={key}>
            <span className="item-key">{keyMap[key]}</span>
            <span className="item-value">{workspace[key]}</span>
          </li>
        );
    });

    return isExpanding ? (
      <ul className="workspace-list fade-in">{itemList}</ul>
    ) : (
      <span className="more" onClick={this.showMore}>
        查看更多
      </span>
    );
  }

  render() {
    const { shouldShow } = this.state;
    return shouldShow ? (
      <div className="profile-workspace">{this.renderWorkspaceList()}</div>
    ) : null;
  }
}
