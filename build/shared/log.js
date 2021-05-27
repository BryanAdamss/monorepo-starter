/**
 * @author ghchu
 * @description log
 */

const log = console.log.bind(console)

module.exports = {
  log: (msg) => log(`------- ${msg} -------`)
}
