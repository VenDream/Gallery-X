/**
 * 应用入口模块
 * @author VenDream
 * @since 2018-9-21
 */

import Koa from 'koa';
import path from 'path';
import log4js from 'koa-log4';
import views from 'koa-views';
import session from 'koa-session';
import favicon from 'koa-favicon';
import bodyParser from 'koa-bodyparser';

import { appLogger, httpLogger } from './utils/logger';
import * as routers from './controller';
import notFoundHandler from './middleare/404';
import checkAuthHandler from './middleare/auth';
import globalErrorHandler from './middleare/error';
import serverConfig from '../../var/server.config.json';
import staticConfig from '../../var/static.config.json';

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
// 注入全局错误处理模块
app.use(globalErrorHandler());
// 提供favicon网站图标
app.use(favicon(path.resolve(__dirname + './../public/favicon.ico')));
// 注入模版渲染引擎
app.use(views(staticConfig.distDir));
// 注入授权检查处理模块
app.use(checkAuthHandler());
// 注入路由模块
for (const [name, router] of Object.entries(routers)) {
  appLogger.info(`加载路由模块...${name}`);
  app.use(router.routes()).use(router.allowedMethods());
}
// 注入404处理模块
app.use(notFoundHandler());
// 监听端口并启动服务
app.listen(serverConfig.port);
// 开发模式下，不进行https证书校验
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

appLogger.info(`服务已启动，监听端口： ${serverConfig.port}`);
