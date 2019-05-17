/**
 * webpack配置
 * @author VenDream
 * @since 2019-5-17
 */

import path from 'path';
import parse from 'url-parse';
import WebpackConfig from './build/webpack.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import InlineChunksWebpackPlugin from 'inline-chunks-html-webpack-plugin';

const config: Record<string, any> = require('../var/static.config.json');
const cdnUrl = parse(config.cdnPath);

/**
 * 获取基于根目录的文件路径
 *
 * @param {string} path 文件路径
 */
function resolve(filepath: string) {
  return path.resolve(__dirname, filepath);
}

export default WebpackConfig(() => {
  return {
    context: resolve('.'),
    entry: {
      index: resolve('./src/modules/app'),
      prepare: resolve('./src/modules/prepare'),
    },
    srcDir: resolve('./src'),
    distDir: config.distDir,
    publicPath: config.cdnPath,
    plugins: [
      // 生成html文件
      new HtmlWebpackPlugin({
        cache: true,
        template: resolve('./index.pug'),
        filename: config.distDir + '/index.ejs',
        chunks: ['manifest', 'prepare', 'vendor', 'index'],
        xhtml: true,
        alwaysWriteToDisk: true,
      }),
      // 注入页内执行模块
      new InlineChunksWebpackPlugin({
        inlineChunks: ['manifest'],
      }),
      // 导出html文件
      new HtmlWebpackHarddiskPlugin(),
    ],
    devServer: {
      host: cdnUrl.hostname || 'localhost',
      port: +cdnUrl.port || 3000,
    },
  };
});
