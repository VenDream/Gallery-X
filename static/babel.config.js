module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV === 'development');
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3,
          debug: api.env('development'),
        },
      ],
    ],
    plugins: [
      // ['@babel/plugin-transform-runtime', { helpers: false }],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-export-default-from',
    ],
  };
};
