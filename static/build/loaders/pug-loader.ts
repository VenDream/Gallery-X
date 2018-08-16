/**
 * pug加载规则
 *
 * @export
 * @param {boolean} isDev 是否开发模式
 * @returns
 */
export default function loader(isDev: boolean) {
  return {
    test: /\.(pug|jade)?$/,
    use: [
      {
        loader: 'pug-loader',
        options: {},
      },
    ],
  };
}
