/**
 * logger日志模块
 * @author VenDream
 * @since 2018-8-16
 */

import fs from 'fs';
import path from 'path';
import log4js from 'koa-log4';

// 日志存放路径
const LOG_DIR = path.resolve(__dirname, '../../logs');
// 日志配置路径
const CONF_DIR = path.resolve(__dirname, '../../log4js.json');

class Logger {
  constructor() {
    this.init();
  }

  /**
   * 获取logger实例
   *
   * @returns
   * @memberof Logger
   */
  public getLogger(name: string) {
    return log4js.getLogger(name);
  }

  /**
   * 停止日志记录
   *
   * @memberof Logger
   */
  public shutdown() {
    log4js.shutdown();
  }

  private init() {
    this.createLogDir(LOG_DIR);
    this.readConfig(CONF_DIR);
  }

  /**
   * 读取日志配置
   *
   * @private
   * @param {string} confDir 配置文件路径
   * @memberof Logger
   */
  private readConfig(confDir: string) {
    log4js.configure(confDir, { cwd: LOG_DIR });
  }

  /**
   * 创建日志目录
   *
   * @private
   * @param {string} logDir 日志存放路径
   * @memberof Logger
   */
  private createLogDir(logDir: string) {
    try {
      fs.mkdirSync(logDir);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.error('无法正确配置日志路径，请检查');
        process.exit(1);
      }
    }
  }
}

export default new Logger();
export const appLogger = log4js.getLogger('APP');
export const httpLogger = log4js.getLogger('HTTP');
