/**
 * 插画相关路由
 * @author VenDream
 * @since 2018-8-21
 */

import Router from 'koa-router';
import * as IllustSvr from '../../service/illust';
import { getAccessToken } from '../auth';
import { handlePixivResp } from '../../utils/response';
import RESPONSE_CODE from '../../constants/response-code';
import {
  getRankingParams,
  getSearchParams,
  getParsedIllusts,
} from '../../utils/illust';

const router = new Router();

/**
 * 插画类请求的统一返回结果处理
 *
 * @param {Router.IRouterContext} ctx 请求上下文
 * @param {Record<string, any>} resp 响应数据
 * @param {number} [step=30] 返回的记录数量
 */
function returnIllustResp(
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

export default router.routes();
