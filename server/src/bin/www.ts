/**
 * 程序启动入口
 * @author VenDream
 * @since 2018-9-27
 */

import App from '../index';
import { appLogger } from '../utils/logger';

// 监听端口并启动服务
App.listen(process.env.PORT);
appLogger.info(`服务已启动，监听端口： ${process.env.PORT}`);
