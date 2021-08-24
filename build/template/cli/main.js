/**
 * @author GuangHui
 * @description cli 入口模板
 */

module.exports = `/**
* @author GuangHui
* @description 入口
*/

const fs = require('fs')
const path = require('path')

module.exports = function start({
  propA = ['src/**/*.vue', 'src/**/*.js'],
  propB = false
} = {}) {
  // do something
}`
