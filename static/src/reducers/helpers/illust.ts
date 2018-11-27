/**
 * 插画状态同步辅助函数
 * @author VenDream
 * @since 2018-11-27
 */

/**
 * 获取更新后的illusts
 *
 * @param {IllustModel[]} illusts 传入的illusts
 * @param {IllustState} state 插画state
 * @returns
 */
export function getUpdatedIllusts(illusts: IllustModel[], state: IllustState) {
  const ids: string[] = [];
  const byId: Record<string, IllustSaveModel> = {};

  for (const illust of illusts) {
    ids.push(illust.id);
    const { user, ...illustBaseInfo } = illust;
    byId[illust.id] = {
      ...illustBaseInfo,
      // 这里只需要记录插画作者id即可
      user: illust.user.id,
    };
  }
  return {
    byId: { ...state.byId, ...byId },
    // 利用ES6的set去重
    ids: Array.from(new Set(state.ids.concat(ids))),
  };
}

/**
 * 获取收藏状态更新后的state
 *
 * @export
 * @param {string} illustId 插画ID
 * @param {IllustState} state 插画state
 * @param {boolean} likeStatus 收藏状态
 */
export function getLikeToggleState(
  illustId: string,
  state: IllustState,
  likeStatus: boolean
) {
  const originIllust = state.byId[illustId];
  const updateillust: IllustSaveModel = {
    ...originIllust,
    // 更新收藏状态
    isBookmarked: likeStatus,
    // 更新总收藏数
    totalBookmarks: likeStatus
      ? originIllust.totalBookmarks + 1
      : originIllust.totalBookmarks - 1,
  };
  return {
    ...state,
    byId: {
      ...state.byId,
      [illustId]: updateillust,
    },
  };
}
