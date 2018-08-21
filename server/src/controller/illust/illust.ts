/**
 * 插画相关路由
 * @author VenDream
 * @since 2018-8-21
 */

import Router from 'koa-router';
import * as IllustSvr from '../../service/illust';
import { getAccessToken } from '../auth';
import { handlePixivResp } from '../../utils/response';
import { getRankingParams, getParsedIllusts } from '../../utils/illust';
import RESPONSE_CODE from '../../constants/response-code';

const router = new Router();

router.get('/ranking', async (ctx, next) => {
  const filter = ctx.request.query as Record<string, any>;
  const params = getRankingParams(filter);
  const token = await getAccessToken(ctx);
  const rankingResp = await IllustSvr.ranking(token, params);
  const resp = handlePixivResp(rankingResp) || {};
  const { illusts, nextUrl } = resp;

  if (illusts) {
    // 取值范围[1, 30]
    let taken = filter.step || 30;
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
});

export default router.routes();
