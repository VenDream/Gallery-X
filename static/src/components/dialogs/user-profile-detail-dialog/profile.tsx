/**
 * 用户个人资料详情 - 详细资料模块
 * @author VenDream
 * @since 2018-12-18
 */

import React from 'react';
import moment from 'moment';
import { getName as getCountryName } from 'country-list';

import { parseCommentStr } from 'components/helpers/comment';
import './profile.less';

/**
 * 详细资料
 *
 * @export
 * @param {{
 *   profileDetail: UserProfileDetailModel;
 * }} props props
 * @returns
 */
export default function Profile(props: {
  profileDetail: UserProfileDetailModel;
}) {
  const { user, profile } = props.profileDetail;
  const { comment } = user;
  const { gender, countryCode, birth, job, webpage, twitterUrl } = profile;
  const { twitterAccount, totalFollowUsers, totalMypixivUsers } = profile;
  const showFollowUsersDialog = () => {
    console.log(user.id);
  };
  const showMyPixivFriendsDialog = () => {
    console.log(user.id);
  };

  // 个人主页
  const homePage = webpage ? (
    <a className="home-page" href={webpage} target="_blank">
      <i className="g-icon icon-home" />
      <span className="home-url">
        {webpage.replace(/https?:\/\//g, '').replace(/\/$/g, '')}
      </span>
    </a>
  ) : null;
  // 推特主页
  const twitter = twitterAccount ? (
    <a className="twitter" href={twitterUrl} target="_blank">
      <i className="g-icon icon-twitter" />
      {twitterAccount}
    </a>
  ) : null;
  // 总关注
  const totalFollow = totalFollowUsers ? (
    <span className="total-follow-users" onClick={showFollowUsersDialog}>
      <span className="total-num">{totalFollowUsers}</span>
      关注
    </span>
  ) : null;
  // 总好P友
  const totalFriends = totalMypixivUsers ? (
    <span className="total-pixiv-friends" onClick={showMyPixivFriendsDialog}>
      <span className="total-num">{totalMypixivUsers}</span>
      好P友
    </span>
  ) : null;
  // 个人描述
  const selfComment = comment ? (
    <div className="self-comment">{parseCommentStr(comment)}</div>
  ) : null;
  // 基础信息
  const birthDate = (birth && moment(birth)) || null;
  const basicInfoText = [
    gender && `${gender === 'male' ? '男性' : '女性'}`,
    countryCode && `${getCountryName(countryCode)}`,
    birthDate && `${new Date().getFullYear() - birthDate.year()}岁`,
    birthDate && `${birthDate.month() + 1}月${birthDate.date()}日出生`,
    job,
  ]
    .filter(info => !!info)
    .join(' / ');
  const basicInfo = <span className="basic-info">{basicInfoText}</span>;

  return (
    <div className="profile-detail">
      <div className="profile-url">
        {homePage}
        {twitter}
      </div>
      <div className="profile-statistic">
        {totalFollow}
        {totalFriends}
      </div>
      {selfComment}
      {basicInfo}
    </div>
  );
}
