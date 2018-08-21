/**
 * 插画相关路由
 * @author VenDream
 * @since 2018-8-21
 */

import Router from 'koa-router';
import * as IllustSvr from '../../service/illust';
import { getAccessToken } from '../auth';
import { handlePixivResp } from '../../utils/response';
import { getRankingParams, getSearchParams } from '../../utils/illust';
import { returnIllustResp, returnCommentsResp } from './returner';

const router = new Router();

router.get('/ranking', async (ctx, next) => {
  const filter = ctx.request.query as RankingFilter;
  const params = getRankingParams(filter);
  const token = await getAccessToken(ctx);
  const rankingResp = await IllustSvr.ranking(token, params);
  const resp = handlePixivResp(rankingResp) || {};

  returnIllustResp(ctx, resp, filter.step);
});

router.get('/search', async (ctx, next) => {
  const filter = ctx.request.query as SearchFilter;
  const params = getSearchParams(filter);
  const token = await getAccessToken(ctx);
  const searchResp = await IllustSvr.search(token, params);
  const resp = handlePixivResp(searchResp) || {};

  returnIllustResp(ctx, resp, filter.step);
});

router.get('/comments', async (ctx, next) => {
  const { illustId, lastCommentId } = ctx.request.query;
  const token = await getAccessToken(ctx);
  const commentsResp = await IllustSvr.comments(token, illustId, lastCommentId);
  const resp = handlePixivResp(commentsResp);

  returnCommentsResp(ctx, resp);
});

router.get('/comment/replies', async (ctx, next) => {
  const { commentId } = ctx.request.query;
  const token = await getAccessToken(ctx);
  const repliesResp = await IllustSvr.commentReplies(token, commentId);
  const resp = handlePixivResp(repliesResp);

  returnCommentsResp(ctx, resp);
});

export default router.routes();
