/**
 * 应用入口模块
 * @author VenDream
 * @since 2018-11-22
 */

import Koa from 'koa';
import path from 'path';
import log4js from 'koa-log4';
import views from 'koa-views';
import session from 'koa-session';
import favicon from 'koa-favicon';
import bodyParser from 'koa-bodyparser';

import cache from './middleare/cache';
import { loadJSON } from './utils/loader';
import * as routers from './controller';
import notFoundHandler from './middleare/404';
import checkAuthHandler from './middleare/auth';
import globalErrorHandler from './middleare/error';
import { appLogger, httpLogger } from './utils/logger';

// 读取配置文件
const serverConfig = loadJSON(
  path.resolve(__dirname, '../../var/server.config.json')
);
const staticConfig = loadJSON(
  path.resolve(__dirname, '../../var/static.config.json')
);

// 创建Koa实例
const app = new Koa();
// 注入日志模块
app.use(log4js.koaLogger(httpLogger, { level: 'auto' }));

// 设置session
app.keys = [serverConfig.sessionKey];
const sessionConfig = {
  key: 'pixiv_session',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  renew: true,
};
// 注入session模块
app.use(session(sessionConfig, app));

// 注入bodyparser
app.use(bodyParser());
// 注入授权检查处理模块
app.use(checkAuthHandler());
// 注入缓存模块
app.use(cache());
// 注入全局错误处理模块
app.use(globalErrorHandler());
// 提供favicon网站图标
app.use(favicon(path.resolve(__dirname + './public/favicon.ico')));
// 注入模版渲染引擎
app.use(views(staticConfig.distDir));
// 注入路由模块
for (const [name, router] of Object.entries(routers)) {
  appLogger.info(`加载路由模块...${name}`);
  app.use(router.routes()).use(router.allowedMethods());
}
// 注入404处理模块
app.use(notFoundHandler());

export default app;
