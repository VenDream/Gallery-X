/**
 * webpack配置
 * @author VenDream
 * @since 2018-6-23
 */

import path from 'path';
import WebpackConfig from './build/webpack.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
  };
});
