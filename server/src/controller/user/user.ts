/**
 * 用户相关路由
 * @author VenDream
 * @since 2018-8-16
 */

import Router from 'koa-router';
import * as UserService from '../../service/user';
import RESPONSE_CODE from '../../constants/response-code';

const router = new Router();

router.get('/info', async (ctx, next) => {
  const user = await UserService.getUserInfo();
  ctx.body = {
    code: RESPONSE_CODE.SUCCESS,
    data: user,
  };
});

export default router.routes();
