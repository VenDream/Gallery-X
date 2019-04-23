import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/**
 * CSS加载规则
 *
 * @export
 * @param {boolean} isDev 是否开发模式
 * @returns
 */
export default function loader(isDev: boolean) {
  return {
    test: /\.css$/,
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
          importLoaders: 1,
        },
      },
      'postcss-loader',
    ],
  };
}
