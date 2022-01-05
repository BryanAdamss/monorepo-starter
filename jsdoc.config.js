/**
 * @author GuangHui
 * @description jsdoc配置
 */

module.exports = {
  source: {
    includePattern: '.+\\.(ts|js)$',
    excludePattern: '.+\\.(test|spec).(ts|js)'
  },
  plugins: ['plugins/markdown', 'node_modules/jsdoc-babel'],
  babel: {
    extensions: ['ts', 'tsx'],
    ignore: ['**/*.(test|spec).ts'],
    babelrc: false,
    presets: [
      ['@babel/preset-env', { targets: { node: true } }],
      '@babel/preset-typescript'
    ],
    plugins: ['@babel/proposal-class-properties']
  }
}
