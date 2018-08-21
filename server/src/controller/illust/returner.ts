/**
 * 插画相关接口统一返回处理工具函数
 * @author VenDream
 * @since 2018-8-21
 */

import Router from 'koa-router';
import RESPONSE_CODE from '../../constants/response-code';
import { getParsedIllusts, getParsedComments } from '../../utils/illust';

/**
 * 插画类请求的统一返回结果处理
 *
 * @param {Router.IRouterContext} ctx 请求上下文
 * @param {Record<string, any>} resp 响应数据
 * @param {number} [step=30] 返回的记录数量
 */
export function returnIllustResp(
  ctx: Router.IRouterContext,
  resp: Record<string, any>,
  step: number = 30
) {
  const { illusts, nextUrl } = resp;
  if (illusts) {
    // 取值范围[1, 30]
    let taken = step;
    taken = Math.min(30, taken);
    taken = Math.max(1, taken);

    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      data: {
        illusts: getParsedIllusts(illusts).slice(0, taken),
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
 * 评论类请求的统一返回结果处理
 *
 * @param {Router.IRouterContext} ctx 请求上下文
 * @param {Record<string, any>} resp 响应数据
 */
export function returnCommentsResp(
  ctx: Router.IRouterContext,
  resp: Record<string, any>
) {
  const { comments, nextUrl } = resp;
  if (comments) {
    const parsedComments = getParsedComments(comments);
    const lastComment = parsedComments[parsedComments.length - 1];

    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      data: {
        comments: parsedComments,
        lastCommentId: lastComment.id || '',
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
  if (!resp.message && !resp.userMessage) {
    ctx.body = { code: RESPONSE_CODE.SUCCESS };
  } else {
    ctx.body = {
      code: RESPONSE_CODE.FAILED,
      message: resp.message || resp.userMessage || '操作失败',
    };
  }
}
