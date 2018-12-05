/**
 * 用户相关路由
 * @author VenDream
 * @since 2018-12-5
 */

import Router from 'koa-router';
import * as UserSvr from '../../service/user';
import { getAccessToken } from '../auth';
import { getSessionByKey, getProxyImageUrl } from '../../utils/common';
import { handlePixivResp } from '../../utils/response';
import { cleanUserApiCache } from '../../utils/cache';
import { returnIllustResp } from '../illust/returner';
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
    const errMsg = resp && resp.system && (resp.system.message as string);
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

router.post('/follow', async (ctx, next) => {
  const session = ctx.session as AppSession;
  const { userId, isPrivate } = ctx.request.body as Record<string, any>;
  const token = await getAccessToken(ctx);
  const followResp = await UserSvr.follow(token, userId, isPrivate);
  const resp = handlePixivResp(followResp);

  if (!resp.message && !resp.userMessage) {
    cleanUserApiCache(session.user.id);
    ctx.body = { code: RESPONSE_CODE.SUCCESS };
  } else {
    ctx.body = {
      code: RESPONSE_CODE.FAILED,
      message: resp.message || resp.userMessage || '操作失败',
    };
  }
});

router.post('/unfollow', async (ctx, next) => {
  const session = ctx.session as AppSession;
  const { userId } = ctx.request.body as Record<string, any>;
  const token = await getAccessToken(ctx);
  const followResp = await UserSvr.unfollow(token, userId);
  const resp = handlePixivResp(followResp);

  if (!resp.message && !resp.userMessage) {
    cleanUserApiCache(session.user.id);
    ctx.body = { code: RESPONSE_CODE.SUCCESS };
  } else {
    ctx.body = {
      code: RESPONSE_CODE.FAILED,
      message: resp.message || resp.userMessage || '操作失败',
    };
  }
});

router.get('/illusts', async (ctx, next) => {
  const { userId } = ctx.request.query as Record<string, any>;
  const token = await getAccessToken(ctx);
  const illustsResp = await UserSvr.getUserIllusts(token, userId);
  const resp = handlePixivResp(illustsResp);

  returnIllustResp(ctx, resp);
});

router.get('/profile/detail', async (ctx, next) => {
  const { userId } = ctx.request.query as Record<string, any>;
  const token = await getAccessToken(ctx);
  const profileResp = await UserSvr.getUserProfileDetail(token, userId);
  const resp = handlePixivResp(profileResp);

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
      profileDetail: {
        user,
        profile,
        workspace,
        profilePublicity,
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
