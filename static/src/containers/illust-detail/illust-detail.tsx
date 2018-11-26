/**
 * 插画详情容器组件
 * @author VenDream
 * @since 2018-11-26
 */

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import IllustDetail from 'components/illust-detail';
import { addIllust, like, unlike } from 'actions/illust';
import { follow, unfollow } from 'actions/user';

function mapStateToProps(state: StoreState, ownProps: Record<string, any>) {
  const illustId: string = ownProps.id;
  const illusts = state.illust;
  const artists = state.artist;
  const basicIllust = illusts.byId[illustId];
  // 从illust状态和artist状态中取出实际的数据
  const illust: IllustModel = {
    ...basicIllust,
    user: artists.byId[basicIllust.user],
  };

  return { id: illustId, illust };
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IllustDetail);
