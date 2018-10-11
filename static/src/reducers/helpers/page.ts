/**
 * 页面状态同步辅助函数
 * @author VenDream
 * @since 2018-10-11
 */

/**
 * 获取更新后的页面插画ID
 *
 * @export
 * @param {string[]} originIllustIds 页面原插画ID
 * @param {IllustModel[]} illusts 请求得到新插画数据
 * @returns
 */
export function getUpdatedPageIllustIds(
  originIllustIds: string[],
  illusts: IllustModel[]
) {
  const newIllustIds: string[] = [];
  for (const illust of illusts) {
    newIllustIds.push(illust.id);
  }
  return [...originIllustIds, ...newIllustIds];
}
