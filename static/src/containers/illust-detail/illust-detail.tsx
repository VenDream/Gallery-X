/**
 * 插画详情容器组件
 * @author VenDream
 * @since 2018-12-24
 */

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { redirectTo } from 'actions/router';
import { follow, unfollow } from 'actions/user';
import { addIllust, like, unlike, searchByTag } from 'actions/illust';
import IllustDetail from 'components/illust-detail';

function mapStateToProps(state: StoreState, ownProps: Record<string, any>) {
  const illustId: string = ownProps.id;
  const popupInstanceId: string = ownProps.popupInstanceId;
  const illusts = state.illust;
  const artists = state.artist;
  const basicIllust = illusts.byId[illustId];
  // 从illust状态和artist状态中取出实际的数据
  const illust: IllustModel = {
    ...basicIllust,
    user: artists.byId[basicIllust.user],
  };

  return { id: illustId, illust, popupInstanceId };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>
) {
  return {
    addIllust: (illusts: IllustModel[]) => dispatch(addIllust(illusts)),
    like: (illustId: string) => dispatch(like(illustId)),
    unlike: (illustId: string) => dispatch(unlike(illustId)),
    follow: (userId: string) => dispatch(follow(userId)),
    unfollow: (userId: string) => dispatch(unfollow(userId)),
    searchByTag: (tag: string) => dispatch(searchByTag(tag)),
    redirectTo: (path: string) => dispatch(redirectTo(path)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IllustDetail);
