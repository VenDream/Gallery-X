/**
 * 插画详情容器组件
 * @author VenDream
 * @since 2018-10-17
 */

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import IllustDetail from 'components/illust-detail';
import { addIllust } from 'actions/illust';

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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IllustDetail);
