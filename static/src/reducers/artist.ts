/**
 * 艺术家状态同步
 * @author VenDream
 * @since 2018-10-17
 */

import { AnyAction } from 'redux';
import ACTIONS from 'constants/actions';
import { getUpdatedArtists } from './helpers/artist';

const initState: ArtistState = {
  byId: {},
  ids: [],
};

export default function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    // 增加插画时，同步增加涉及到的艺术家
    case ACTIONS.ADD_ILLUST:
    case ACTIONS.GET_RANKING_ILLUST_SUCCESS:
    case ACTIONS.GET_SEARCH_ILLUST_SUCCESS:
    case ACTIONS.GET_RANKING_ILLUST_END:
    case ACTIONS.GET_SEARCH_ILLUST_END: {
      const illusts: IllustModel[] = action.data.illusts;
      const updatedArtists = getUpdatedArtists(illusts, state);
      return {
        ...state,
        ...updatedArtists,
      };
    }

    default:
      return state;
  }
}
