/**
 * 加解密处理模块
 * @author VenDream
 * @since 2018-11-22
 */

import crypto from 'crypto';

/**
 * MD5加密
 *
 * @export
 * @param {string} str 明文
 */
export function md5(str: string) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex');
}
