/**
 * 常用时间日期工具函数
 * @author VenDream
 * @since 2018-8-17
 */

/**
 * 获取从现在起n秒后的时间
 *
 * @export
 * @param {number} n 秒数
 */
export function getDateAfterSeconds(n: number) {
  const now = new Date();
  return new Date(now.setSeconds(now.getSeconds() + n));
}
