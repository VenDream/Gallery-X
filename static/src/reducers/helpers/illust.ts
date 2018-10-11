/**
 * 插画状态同步辅助函数
 * @author VenDream
 * @since 2018-10-11
 */

/**
 * 获取更新后的illusts
 *
 * @param {IllustModel[]} illusts 传入的illusts
 * @param {IllustState} state 插画state
 * @returns
 */
export function getUpdatedIllusts(illusts: IllustModel[], state: IllustState) {
  const ids = [];
  const byId = {};
  for (const illust of illusts) {
    ids.push(illust.id);
    byId[illust.id] = illust;
  }
  return { byId: { ...state.byId, ...byId }, ids: [...state.ids, ...ids] };
}
