/**
 * 自定义模块加载方法
 * @author VenDream
 * @since 2018-9-27
 */

import fs from 'fs';

/**
 * 加载JSON模块
 *
 * @export
 * @param {string} filename JSON文件路径
 */
export function loadJSON(filename: string) {
  const content = fs.readFileSync(filename, 'utf8');
  try {
    return JSON.parse(content);
  } catch (err) {
    console.error(err);
    return {};
  }
}
