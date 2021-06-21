/**
 * @author GuangHui
 * @description 工具方法
 */
const prettier = require('prettier')
const { scope } = require('../../project.config')

const log = console.log.bind(console)
const parse = JSON.parse.bind(JSON)
const stringify = JSON.stringify.bind(JSON)

/**
 * 从@{scope}/xxxx中提取出xxxx
 *
 * @date 2021-06-21 16:00:01
 * @param {String} name 待提取name
 * @return {String}  提取后的name
 */
function getFileNameFromPkgName(name) {
  return name.slice(scope.length + 2)
}

/**
 * 转换为PascalCase格式
 * @param {String} str 字符串
 * @returns 转后后的字符串
 * @example
 * transform2PascalCase('@hw/svg-assets')
 * => HwSvgAssets
 */
function transform2PascalCase(str) {
  return str.replace(/[@/-]+(\w)/g, (m, g1) => g1.toUpperCase())
}

function prettierWithParser(content, parser = 'babel') {
  return prettier.format(content, {
    tabWidth: 2,
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    parser
  })
}

const prettierMdx = content => prettierWithParser(content, 'mdx')
const prettierMd = content => prettierWithParser(content, 'markdown')
const prettierJson = content => prettierWithParser(content, 'json')

module.exports = {
  log: msg => log(`------- ${msg} -------`),
  parse,
  stringify: arg => stringify(arg, null, 2),
  getFileNameFromPkgName,
  transform2PascalCase,
  prettierWithParser,
  prettierMdx,
  prettierMd,
  prettierJson
}
