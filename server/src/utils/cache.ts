/**
 * 缓存相关工具函数
 *
 * @author VenDream
 * @since 2018-11-23
 */

import { appLogger } from '../utils/logger';
import { redisClient, cacheConfig } from '../middleare/cache';

/**
 * 清空用户相关Redis缓存
 *
 * @export
 * @param {string} userId 用户ID
 */
export async function cleanUserApiCache(userId: string) {
  // 通过用户ID查找用户相关api缓存记录
  const pattern = `*${cacheConfig.prefix}_${userId}*`;
  const cacheKeys = await redisClient.keys(pattern);
  // 统一删除
  if (cacheKeys.length) {
    const total = await redisClient.del(...cacheKeys);
    appLogger.info(
      `Successfully clean user_${userId} ${total} api cahce record(s)...`
    );
  }
}
