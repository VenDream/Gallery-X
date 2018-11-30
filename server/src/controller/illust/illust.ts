/**
 * 插画相关路由
 * @author VenDream
 * @since 2018-11-29
 */

import Router from 'koa-router';
import * as IllustSvr from '../../service/illust';
import { getAccessToken } from '../auth';
import { handlePixivResp } from '../../utils/response';
import { getRankingParams, getSearchParams } from '../../utils/illust';
import {
  returnIllustResp,
  returnCommentsResp,
  returnLikeResp,
} from './returner';

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

  returnCommentsResp(ctx, resp, { respKey: 'comments' });
});

router.get('/comment/replies', async (ctx, next) => {
  const { commentId } = ctx.request.query;
  const token = await getAccessToken(ctx);
  const repliesResp = await IllustSvr.commentReplies(token, commentId);
  const resp = handlePixivResp(repliesResp);

  returnCommentsResp(ctx, resp, { respKey: 'replies' });
});

router.post('/like', async (ctx, next) => {
  const { illustId, isPrivate } = ctx.request.body as Record<string, any>;
  const token = await getAccessToken(ctx);
  const likeResp = await IllustSvr.like(token, illustId, isPrivate);
  const resp = handlePixivResp(likeResp);

  returnLikeResp(ctx, resp);
});

router.post('/unlike', async (ctx, next) => {
  const { illustId } = ctx.request.body as Record<string, any>;
  const token = await getAccessToken(ctx);
  const likeResp = await IllustSvr.unlike(token, illustId);
  const resp = handlePixivResp(likeResp);

  returnLikeResp(ctx, resp);
});

export default router.routes();
