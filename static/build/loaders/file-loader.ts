/**
 * 文件加载规则
 *
 * @export
 * @param {boolean} isDev 是否开发模式
 * @returns
 */
export default function loader(isDev: boolean) {
  return {
    test: /\.(woff|svg|eot|ttf)\??.*$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: `[name]${isDev ? '' : '.[hash:10]'}.[ext]`,
          outputPath: 'fonts/',
        },
      },
    ],
  };
}
