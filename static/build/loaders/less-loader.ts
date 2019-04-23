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
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: isDev,
        },
      },
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
