/**
 * @author GuangHui
 * @description 入口文件
 */

const { GenRequest } = require('./gen-request.js')

const instance = new GenRequest()

module.exports = {
  GenRequest,
  batchGenerate: (...args) => instance.batchGenerate(...args),
  generate: (...args) => instance.generate(...args),
  watch: (...args) => instance.watch(...args)
}
