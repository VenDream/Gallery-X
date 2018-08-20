/**
 * 插画相关路由
 * @author VenDream
 * @since 2018-8-20
 */

import Router from 'koa-router';
import * as IllustSvr from '../../service/illust';
import { getRankingParams, getParsedIllusts } from '../../utils/illust';
import { handlePixivResp } from '../../utils/response';
import RESPONSE_CODE from '../../constants/response-code';

const router = new Router();

router.get('/ranking', async (ctx, next) => {
  const session = ctx.session as AppSession;
  const token = session.accessToken;
  const filter = ctx.request.query as Record<string, any>;
  const params = getRankingParams(filter);
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
        illust: getParsedIllusts(illusts).slice(0, taken),
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
