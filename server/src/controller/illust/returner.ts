/**
 * 插画相关接口统一返回处理工具函数
 * @author VenDream
 * @since 2018-12-27
 */

import Router from 'koa-router';
import RESPONSE_CODE from '../../constants/response-code';
import { cleanUserApiCache } from '../../utils/cache';
import { getProxyImageUrl } from '../../utils/common';
import { getParsedIllusts, getParsedComments } from '../../utils/illust';

interface IllustRespOption {
  /**
   * 返回的记录数
   */
  step?: number;
  /**
   * 数据载体的key
   */
  respKey?: string;
}

/**
 * 插画类请求的统一返回结果处理
 *
 * @param {Router.IRouterContext} ctx 请求上下文
 * @param {Record<string, any>} resp 响应数据
 * @param {IllustRespOption} [option={}] 其他选项
 */
export function returnIllustResp(
  ctx: Router.IRouterContext,
  resp: Record<string, any>,
  option: IllustRespOption = {}
) {
  let maxBookmarkId;
  const { illusts, nextUrl = '' } = resp;
  const { step = 30, respKey = 'illusts' } = option;
  if (illusts) {
    // 取值范围[1, 30]
    let taken = step;
    taken = Math.min(30, taken);
    taken = Math.max(1, taken);

    // 组装返回数据
    const data = {
      [respKey]: getParsedIllusts(illusts).slice(0, taken),
      isEnd: !!!nextUrl,
    };

    // 解析收藏请求中的[max_bookmark_id]参数
    const result = (nextUrl || '').match(/max_bookmark_id=(\d+)/);
    maxBookmarkId = (result && result[1]) || '';
    maxBookmarkId && (data['maxBookmarkId'] = maxBookmarkId);

    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      data,
    };
  } else {
    ctx.body = {
      code: RESPONSE_CODE.FAILED,
      message: resp.message || resp,
    };
  }
}

// 评论类接口返回选项
interface CommentRespOption {
  /**
   * 数据载体的key
   */
  respKey?: 'comments' | 'replies';
}

/**
 *
 *
 * @export
 * @param {Router.IRouterContext} ctx 请求上下文
 * @param {Record<string, any>} resp 响应数据
 * @param {CommentRespOption} [option={}] 其他选项
 */
export function returnCommentsResp(
  ctx: Router.IRouterContext,
  resp: Record<string, any>,
  option: CommentRespOption = {}
) {
  const { comments, nextUrl } = resp;
  if (comments) {
    const { respKey = 'comments' } = option;
    const commentData: CommentModel[] = comments;
    const totalLen = commentData.length;
    const parsedComments = getParsedComments(commentData);
    const lastComment = totalLen >= 1 ? parsedComments[totalLen - 1] : null;

    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      data: {
        [respKey]: parsedComments,
        lastCommentId: (lastComment && lastComment.id) || '',
        isEnd: !!!nextUrl,
      },
    };
  } else {
    ctx.body = {
      code: RESPONSE_CODE.FAILED,
      message: resp.message || resp,
    };
  }
}

/**
 * 收藏类请求的统一返回结果处理
 *
 * @export
 * @param {Router.IRouterContext} ctx 请求上下文
 * @param {Record<string, any>} resp 响应数据
 */
export function returnLikeResp(
  ctx: Router.IRouterContext,
  resp: Record<string, any>
) {
  const session = ctx.session as AppSession;
  const { id } = session.user;

  if (!resp.message && !resp.userMessage) {
    cleanUserApiCache(id);
    ctx.body = { code: RESPONSE_CODE.SUCCESS };
  } else {
    ctx.body = {
      code: RESPONSE_CODE.FAILED,
      message: resp.message || resp.userMessage || '操作失败',
    };
  }
}

/**
 * 处理个人资料请求
 *
 * @export
 * @param {Router.IRouterContext} ctx 环境上下文
 * @param {Record<string, any>} resp 响应数据
 */
export function returnProfileResp(
  ctx: Router.IRouterContext,
  resp: Record<string, any>
) {
  const { user, profile } = resp as UserProfileDetailModel;
  const { workspace, profilePublicity } = resp as UserProfileDetailModel;

  if (user) {
    // 处理用户头像
    const avatar = getProxyImageUrl(user.profileImageUrls.medium);
    user.avatar = avatar;
    delete user.profileImageUrls;
    // 处理图片
    if (profile.backgroundImageUrl) {
      profile.backgroundImageUrl = getProxyImageUrl(profile.backgroundImageUrl);
    }
    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      data: {
        profileDetail: {
          user,
          profile,
          workspace,
          profilePublicity,
        },
      },
    };
  } else {
    ctx.body = {
      code: RESPONSE_CODE.FAILED,
      message: resp.message || resp,
    };
  }
}
