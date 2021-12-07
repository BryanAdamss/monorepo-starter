/**
 * @author GuangHui
 * @description 参数
 */

module.exports = require('yargs')
  .array('patterns')
  .default('patterns', ['src/services/api/*.js'])
  .boolean('debug')
  .default('debug', false)
  .boolean('watch')
  .default('watch', true)
  .default('requestFnName', 'apiBuilderInstance.create')
  .default('requestImportStatement', 'import { apiBuilderInstance } from \'Services/extends/api-builder-instance.js\'')
  .default('outputDir', 'src/services/request')
  .boolean('autoRemove')
  .default('autoRemove', false)
  .boolean('execOnceOnStart')
  .default('execOnceOnStart', true)
  .boolean('autoCleanOutputDirOnStart')
  .default('autoCleanOutputDirOnStart', true)
