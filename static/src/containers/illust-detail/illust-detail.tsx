/**
 * 插画详情容器组件
 * @author VenDream
 * @since 2019-2-15
 */

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { redirectTo } from 'actions/router';
import { follow, unfollow } from 'actions/user';
import { getConnectedCmp } from 'utils/connect';
import { addIllust, like, unlike, searchByTag } from 'actions/illust';
import IllustDetail from 'components/illust-detail';

function mapStateToProps(state: StoreState, ownProps: Record<string, any>) {
  const illusts = state.illust;
  const artists = state.artist;
  const illustId: string = ownProps.id;
  const popupInstanceId: string = ownProps.popupInstanceId;
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

export default getConnectedCmp(
  IllustDetail,
  mapStateToProps,
  mapDispatchToProps
);
