/**
 * 常用工具函数
 * @author VenDream
 * @since 2019-9-12
 */

import { MD5 } from 'crypto-js';

// 模仿Pixiv iOS客户端的请求头
interface PixivAppRequestHeader {
  /** 应用版本 */
  'App-OS': string;
  /** UA */
  'User-Agent': string;
  /** 操作系统版本 */
  'App-OS-Version': string;
  /** 客户端时间戳 */
  'X-Client-Time': string;
  /** 客户端校验哈希 */
  'X-Client-Hash': string;
}

type FixHeaderKey = Exclude<
  keyof PixivAppRequestHeader,
  'X-Client-Time' | 'X-Client-Hash'
>;
type FixedHeader = Pick<PixivAppRequestHeader, FixHeaderKey>;

const MAGIC_HASH_SALT =
  '28c1fdd170a5204386cb1313c7077b34f83e4aaf4aa829ce78c231e05b0bae2c';

const fixHeader: FixedHeader = {
  'App-OS': 'ios',
  'App-OS-Version': '12.1.4',
  'User-Agent': 'PixivIOSApp/7.7.1 (iOS 12.1.4; iPhone8,2)',
};

export function getHeader(): PixivAppRequestHeader {
  const clientTime = new Date().toISOString();
  const clientHash = MD5(`${clientTime}${MAGIC_HASH_SALT}`).toString();
  return {
    ...fixHeader,
    'X-Client-Time': clientTime,
    'X-Client-Hash': clientHash,
  };
}
