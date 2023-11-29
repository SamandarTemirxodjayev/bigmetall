module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['dist/**/*', 'node_modules/**/*', 'webpack.config.js', 'tests/**/*'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-param-reassign': ['warn', { props: false }],
    'linebreak-style': 0,
  },
};
