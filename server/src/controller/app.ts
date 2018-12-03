/**
 * 应用顶级路由
 * @author VenDream
 * @since 2018-12-3
 */

import path from 'path';
import Router from 'koa-router';
import { loadJSON } from '../utils/loader';

const serverConfig = loadJSON(
  path.resolve(__dirname, '../../../var/server.config.json')
);

const router = new Router();

// 渲染入口页面
router.get(/^\/(?!api)/, async (ctx, next) => {
  await ctx.render('index.ejs', {
    faviconLink: '/favicon.ico?v=1.0',
    proxyHost: serverConfig.proxyHost,
  });
});

export default router;
