/**
 * @author GuangHui
 * @description 命令行入口
 */

const { argv } = require('./arg.js')
const { watch, batchGenerate } = require('./index.js')

if (argv.watch) {
  watch(argv)
} else {
  batchGenerate(argv)
}
