/**
 * 插画状态同步辅助函数
 * @author VenDream
 * @since 2018-10-17
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
