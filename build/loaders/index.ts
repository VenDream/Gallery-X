import babelLoader from './babel-loader';
import tsLoader from './ts-loader';
import lessLoader from './less-loader';
import cssLoader from './css-loader';
import pugLoader from './pug-loader';
import fileLoader from './file-loader';

/**
 * 生成默认解析规则
 *
 * @export
 * @param {boolean} isDev 是否开发环境
 */
export default function generateDefaultRules(isDev: boolean) {
  const loaders = [
    babelLoader,
    tsLoader,
    lessLoader,
    cssLoader,
    pugLoader,
    fileLoader,
  ];
  return loaders.map(loader => loader.call(loader, isDev));
}
