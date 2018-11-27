/**
 * webpack配置
 * @author VenDream
 * @since 2018-11-27
 */

import path from 'path';
import parse from 'url-parse';
import WebpackConfig from './build/webpack.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlBeautifyPlugin from 'html-beautify-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import InlineChunksWebpackPlugin from 'inline-chunks-html-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';
const config: Record<string, any> = require('../var/static.config.json');
const cdnUrl = parse(config.cdnPath);

/**
 * 获取基于根目录的文件路径
 *
 * @param {string} path 文件路径
 */
function getPath(filepath: string) {
  return path.resolve(__dirname, filepath);
}

export default WebpackConfig(() => {
  return {
    context: getPath('.'),
    entry: {
      index: getPath('./src/modules/app'),
      prepare: getPath('./src/modules/prepare'),
    },
    srcDir: getPath('./src'),
    distDir: config.distDir,
    publicPath: config.cdnPath,
    plugins: [
      // 生成html文件
      new HtmlWebpackPlugin({
        template: getPath('./index.pug'),
        filename: 'index.ejs',
        chunks: ['manifest', 'prepare', 'vendor', 'index'],
        path: config.distDir,
        xhtml: true,
        minify: !isDev,
        alwaysWriteToDisk: true,
      }),
      // 注入页内执行模块
      new InlineChunksWebpackPlugin({
        inlineChunks: ['manifest'],
      }),
      // 开发环境下html格式美化
      ...(isDev ? [new HtmlBeautifyPlugin()] : []),
      // 导出html文件
      new HtmlWebpackHarddiskPlugin(),
    ],
    sourcemapMode: 'cheap-module-eval-source-map',
    devServer: {
      host: cdnUrl.hostname || 'localhost',
      port: +cdnUrl.port || 3000,
    },
  };
});
