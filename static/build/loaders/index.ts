/**
 * 生成默认解析规则
 *
 * @export
 * @param {boolean} isDev 是否开发环境
 */
export default function generateDefaultRules(isDev: boolean) {
  const loaders = [
    require('./babel-loader').default,
    require('./ts-loader').default,
    require('./less-loader').default,
    require('./css-loader').default,
    require('./pug-loader').default,
    require('./file-loader').default,
  ];
  return loaders.map(loader => loader.call(loader, isDev));
}
