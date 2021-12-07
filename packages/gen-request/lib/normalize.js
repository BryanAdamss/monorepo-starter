/**
 * @author GuangHui
 * @description 标准化路径
 */
const path = require('path')

/**
 * 标准化path
 *
 * @date 2021-08-17 10:30:21
 * @param {String} p 路径
 * @return {String}  标准化后的路径
 */
function normalizePath(p) {
  if (typeof p !== 'string') throw new TypeError('Path must be a string')

  return p.split(path.sep).join('/')
}

module.exports = { normalizePath }
