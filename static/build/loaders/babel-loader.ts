/**
 * 全局js加载规则
 *
 * @export
 * @param {boolean} isDev 是否开发模式
 * @returns
 */
export default function loader(isDev: boolean) {
  return {
    test: /^(?!.*\.min\.jsx?$).*\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: 'node_modules/.cache/cache-loader',
        },
      },
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  };
}
