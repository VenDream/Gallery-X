module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      [
        '@babel/preset-env',
        { loose: true, modules: false, useBuiltIns: 'entry' },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};
