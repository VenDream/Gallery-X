/**
 * 插画相关接口
 * @author VenDream
 * @since 2018-11-26
 */

import API from './index';
import * as ajax from 'utils/ajax';

/**
 * 收藏插画
 *
 * @export
 * @param {string} illustId 插画ID
 * @param {boolean} [isPrivate=false] 是否私人收藏
 */
export function like(illustId: string, isPrivate: boolean = false) {
  const api = API.get('ILLUST_LIKE');
  return ajax.post(api, { body: { illustId, isPrivate }, raw: true });
}

/**
 * 取消收藏插画
 *
 * @export
 * @param {string} illustId 插画ID
 */
export function unlike(illustId: string) {
  const api = API.get('ILLUST_UNLIKE');
  return ajax.post(api, { body: { illustId }, raw: true });
}

/**
 * 获取插画评论
 *
 * @export
 * @param {string} illustId 插画ID
 * @param {string} [lastCommentId] 偏移评论ID(即从该评论开始查询后面的评论数据)
 * @returns
 */
export function getComments(illustId: string, lastCommentId?: string) {
  const api = API.get('ILLUST_COMMENT');
  const body: Record<string, string> = { illustId };
  lastCommentId && (body.lastCommentId = lastCommentId);

  return ajax.get(api, { body });
}

/**
 * 获取插画评论回复
 *
 * @export
 * @param {string} commentId 评论ID
 */
export function getCommentReplies(commentId: string) {
  const api = API.get('ILLUST_COMMENT_REPLIES');
  return ajax.get(api, { body: { commentId } });
}
