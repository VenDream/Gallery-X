/**
 * 用户相关路由
 * @author VenDream
 * @since 2018-8-20
 */

import Router from 'koa-router';
import * as UserSvr from '../../service/user';
import { getSessionByKey } from '../../utils/common';
import { handlePixivResp } from '../../utils/response';
import RESPONSE_CODE from '../../constants/response-code';
import { setUserSession, clearUserSession } from './session';

const router = new Router();

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body as Record<string, any>;
  const loginResp = await UserSvr.login(username, password);
  const resp = handlePixivResp(loginResp);
  const isLoginSucceed = setUserSession(ctx, resp);

  if (isLoginSucceed) {
    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      data: resp.user,
    };
  } else {
    const errMsg = resp.message as string;
    if (errMsg && errMsg.includes('103')) {
      resp.message = '用户名或密码错误';
    }
    ctx.body = {
      code: RESPONSE_CODE.FAILED,
      message: resp.message || resp,
    };
  }
});

router.get('/info', async (ctx, next) => {
  const token = getSessionByKey(ctx, 'refreshToken.value');
  const expiredAt = getSessionByKey(ctx, 'refreshToken.expiredAt');
  const hasSession = !!(token && expiredAt);
  const hasExpired = new Date(expiredAt) <= new Date();

  // session不存在，返回空
  if (!hasSession) {
    ctx.body = { code: RESPONSE_CODE.SUCCESS, data: null };
    return;
  }
  // session已过期，重新请求用户信息
  if (hasExpired) {
    const refreshResp = await UserSvr.getUserInfo(token);
    const resp = handlePixivResp(refreshResp);
    const isRefreshSucceed = setUserSession(ctx, resp);

    if (isRefreshSucceed) {
      ctx.body = {
        code: RESPONSE_CODE.SUCCESS,
        data: resp.user,
      };
    } else {
      ctx.body = resp;
    }
  } else {
    // session有效，返回session中的用户信息
    const user = getSessionByKey(ctx, 'user');
    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      data: user,
    };
  }
});

router.post('/logout', async (ctx, next) => {
  clearUserSession(ctx);
  ctx.body = { code: RESPONSE_CODE.SUCCESS };
});

export default router.routes();
