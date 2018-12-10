/**
 * 应用首页
 * @author VenDream
 * @since 2018-6-26
 */

import React, { Component } from 'react';

import UserProfileDetailDialog from 'components/dialogs/user-profile-detail-dialog';
import './home.less';

interface HomeProps {}

export default class Home extends Component<HomeProps> {
  componentDidMount() {
    UserProfileDetailDialog.show({
      id: '5831497',
      transitionClass: 'fade-in-right',
    });
  }

  render() {
    return <div className="page home">首页</div>;
  }
}
