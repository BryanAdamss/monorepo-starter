/**
 * @author GuangHui
 * @description log
 */

const log = console.log.bind(console)
const parse = JSON.parse.bind(JSON)
const stringify = JSON.stringify.bind(JSON)

module.exports = {
  log: (msg) => log(`------- ${msg} -------`),
  parse,
  stringify: (arg) => stringify(arg, null, 2)
}
