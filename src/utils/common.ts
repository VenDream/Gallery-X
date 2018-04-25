/**
 * 常用公用方法
 * @author VenDream
 * @since 2018-4-23
 */

/**
 * 生成指定长度的唯一ID
 *
 * @export
 * @param {number} n ID长度
 */
export function getUniqueId(n: number) {
  let ID = '';
  while (ID.length < n) {
    ID += Math.random()
      .toString(36)
      .substr(2);
  }

  return ID.substr(0, n);
}
