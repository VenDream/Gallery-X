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
      {
        loader: isDev ? MiniCssExtractPlugin.loader : 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'less-loader',
      },
    ],
  };
}
