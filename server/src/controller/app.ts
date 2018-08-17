/**
 * 应用顶级路由
 * @author VenDream
 * @since 2018-8-17
 */

import Router from 'koa-router';

const router = new Router();

// 渲染入口页面
router.get(/^\/(?!api)/, async (ctx, next) => {
  await ctx.render('index.ejs', {
    faviconLink: '/favicon.ico?v=1.0',
  });
});

export default router;
