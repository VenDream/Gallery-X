/**
 * 艺术家状态同步辅助函数
 * @author VenDream
 * @since 2018-10-17
 */

/**
 * 获取更新后的artists
 *
 * @param {IllustModel[]} illusts 传入的illusts
 * @param {IllustState} state 艺术家state
 */
export function getUpdatedArtists(illusts: IllustModel[], state: ArtistState) {
  const ids: string[] = [];
  const byId: Record<string, ArtistModel> = {};

  for (const illust of illusts) {
    const artistId = illust.user.id;
    ids.push(artistId);
    byId[artistId] = illust.user;
  }
  return {
    byId: { ...state.byId, ...byId },
    // 利用ES6的set去重
    ids: Array.from(new Set(state.ids.concat(ids))),
  };
}

/**
 * 获取关注状态更新后的state
 *
 * @export
 * @param {string} artistId 艺术家ID
 * @param {ArtistState} state 艺术家state
 * @param {boolean} followStatus 关注状态
 */
export function getFollowToggledState(
  artistId: string,
  state: ArtistState,
  followStatus: boolean
) {
  const artist: ArtistModel = {
    ...state.byId[artistId],
    isFollowed: followStatus,
  };
  return {
    ...state,
    byId: {
      ...state.byId,
      [artistId]: artist,
    },
  };
}
