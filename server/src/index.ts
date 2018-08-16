/**
 * 应用入口模块
 * @author VenDream
 * @since 2018-8-16
 */

import Koa from 'koa';
import log4js from 'koa-log4';
import views from 'koa-views';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';

import { appLogger, httpLogger } from './utils/logger';
import * as routers from './controller';
import notFoundHandler from './controller/404';
import serverConfig from '../../var/server.config.json';
import staticConfig from '../../var/static.config.json';

// ① 创建Koa实例
const app = new Koa();
// ② 注入日志模块
app.use(log4js.koaLogger(httpLogger, { level: 'auto' }));

// 设置session
app.keys = [serverConfig.sessionKey];
const sessionConfig = {
  key: 'token',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  renew: true,
};
// ③ 注入session模块
app.use(session(sessionConfig, app));

// ④ 注入bodyparser
app.use(bodyParser());
// ⑤ 注入模版渲染引擎
app.use(views(staticConfig.distDir));
// ⑥ 注入路由模块
for (const [name, router] of Object.entries(routers)) {
  appLogger.info(`加载路由模块...${name}`);
  app.use(router.routes()).use(router.allowedMethods());
}
// ⑦ 注入404处理模块
app.use(notFoundHandler());
// ⑧ 监听端口并启动服务
app.listen(serverConfig.port);

appLogger.info(`服务已启动，监听端口： ${serverConfig.port}`);
