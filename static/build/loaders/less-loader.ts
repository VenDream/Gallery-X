import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/**
 * LESS加载规则
 *
 * @export
 * @param {boolean} isDev 是否开发模式
 * @returns
 */
export default function loader(isDev: boolean) {
  const rule = {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
        },
      },
      'postcss-loader',
      'less-loader',
    ],
  };

  // 开发模式启用CSS热更新
  isDev && rule.use.unshift('css-hot-loader');

  return rule;
}
