import path from 'path';
const tscConfig = require(path.resolve(__dirname, '../../', 'tsconfig.json'));

/**
 * ts加载规则
 *
 * @export
 * @param {boolean} isDev 是否开发模式
 * @returns
 */
export default function loader(isDev: boolean) {
  return {
    test: /\.tsx?$/,
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
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          compilerOptions: {
            ...tscConfig.compilerOptions,
            module: 'es2015',
          },
        },
      },
    ],
  };
}
