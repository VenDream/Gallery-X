/**
 * 基础webpack配置
 * @author VenDream
 * @since 2018-9-27
 */

import path from 'path';
import 'webpack-dev-server';
import webpack, { DefinePlugin } from 'webpack';
import generateDefaultRules from './loaders';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = require('../../var/static.config.json');

/**
 * 自定义Webpack配置声明
 */
interface WebpackConfig {
  /**
   * 源码目录
   */
  srcDir?: string;
  /**
   * 输出目录
   */
  distDir?: string;
  /**
   * 资源公共目录
   */
  publicPath?: string;
  /**
   * sourcemap方案
   */
  sourcemapMode?: webpack.Options.Devtool;
}

export default (
  func: () => webpack.Configuration & WebpackConfig
): (() => webpack.Configuration) => {
  return () => {
    // 获取env
    const env = process.env.NODE_ENV;
    const isDev = env === 'development';
    if (!env) throw new Error('NODE_ENV环境变量未设置');

    // 获取应用配置
    const configs = func();
    const userResolve: webpack.Resolve = configs.resolve || {};
    const userModule: webpack.Module = configs.module || { rules: [] };

    // 返回最终webpack配置
    return {
      /**
       * 应用名称
       */
      name: configs.name || 'WEBPACK_APP',
      /**
       * 应用运行环境
       */
      target: configs.target || 'web',
      /**
       * 上下文
       */
      context: configs.context || path.resolve(__dirname, '.'),
      /**
       * 构建模式
       */
      mode: isDev ? 'development' : 'production',
      /**
       * 调试工具，开发模式下输出sourcemap
       */
      devtool: isDev ? configs.sourcemapMode || 'source-map' : false,
      /**
       * 本地开发调试
       */
      devServer: isDev
        ? {
            hot: true,
            compress: true,
            progress: true,
            historyApiFallback: true,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },
            ...configs.devServer,
          }
        : {},
      /**
       * 入口模块
       */
      entry: configs.entry || {},
      /**
       * 输出配置
       */
      output: {
        path: configs.distDir,
        filename: `[name]${isDev ? '' : '.[chunkhash:10]'}.js`,
        publicPath: configs.publicPath || '/',
        sourceMapFilename: '[name].map',
      },
      /**
       * 模块匹配，别名及查找范围
       */
      resolve: {
        alias: userResolve.alias || {},
        modules: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, '../', 'node_modules'),
          path.resolve(configs.srcDir),
        ].concat(userResolve.modules || []),
        // 默认解析js模块与ts模块
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'].concat(
          userResolve.extensions || []
        ),
      },
      /**
       * 模块解析规则
       */
      module: {
        noParse: userModule.noParse,
        rules: generateDefaultRules(isDev).concat(userModule.rules),
      },
      /**
       * 打包优化选项
       */
      optimization: {
        minimize: !isDev,
        splitChunks: {
          cacheGroups: {
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
            },
          },
        },
      },
      /**
       * 插件
       */
      plugins: [
        ...(isDev
          ? [
              new webpack.NamedModulesPlugin(),
              new webpack.HotModuleReplacementPlugin(),
              new MiniCssExtractPlugin({
                filename: '[name].css',
              }),
            ]
          : [
              new MiniCssExtractPlugin({
                filename: '[name].[contenthash:10].css',
              }),
            ]),
      ]
        .concat([
          // 构建前清除distDir
          new CleanWebpackPlugin([configs.distDir], {
            root: configs.context,
            allowExternal: true,
          }),
          // 注入全局配置
          new DefinePlugin({
            'window.__GALLERY_X_GLOBAL_CONFIG__': JSON.stringify(config),
          }),
        ])
        .concat(configs.plugins || []),
    };
  };
};
