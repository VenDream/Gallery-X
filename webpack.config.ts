/**
 * webpack配置
 * @author VenDream
 * @since 2018-8-15
 */

import path from 'path';
import WebpackConfig from './build/webpack.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const config: Record<string, any> = require('./var/config.json');

/**
 * 获取基于根目录的文件路径
 *
 * @param {string} path 文件路径
 */
function getPath(filepath: string) {
  return path.resolve(__dirname, filepath);
}

let cookie;
const { apiHost, devServer } = config;

export default WebpackConfig(() => {
  return {
    context: getPath('.'),
    entry: {
      vendor: ['react', 'redux', 'react-dom', 'react-redux', 'moment'],
      index: getPath('./src/modules/app'),
    },
    srcDir: getPath('./src'),
    distDir: getPath('./dist'),
    publicPath: '/',
    plugins: [
      // 导出html
      new HtmlWebpackPlugin({
        template: getPath('./index.pug'),
        chunks: ['vendor', 'index'],
        path: getPath('./dist'),
      }),
    ],
    sourcemapMode: 'cheap-module-eval-source-map',
    devServer: {
      host: devServer.host,
      port: devServer.port,
      proxy: {
        '/api/*': {
          target: apiHost,
          secure: false,
          changeOrigin: true,
          onProxyReq: proxyReq => {
            // 转发cookie
            cookie && proxyReq.setHeader('Cookie', cookie);
          },
          onProxyRes: proxyRes => {
            // 存储cookie
            cookie = proxyRes.headers['set-cookie'];
          },
        },
      },
    },
  };
});
