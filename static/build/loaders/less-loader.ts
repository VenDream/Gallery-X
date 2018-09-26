import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/**
 * LESS加载规则
 *
 * @export
 * @param {boolean} isDev 是否开发模式
 * @returns
 */
export default function loader(isDev: boolean) {
  return {
    test: /\.less$/,
    use: [
      isDev ? 'css-hot-loader' : '',
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
}
