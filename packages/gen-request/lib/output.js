/**
 * @author GuangHui
 * @description 获取输出字符串
 */

const eol = require('os').EOL
const template = require('./template.js')
const render = require('json-templater/string')

/**
 * 生成output
 *
 * @date 2021-08-11 21:49:08
 * @example
 {
  filePath, // 文件路径
  fileName, // 文件名
  namesTuple, // 名称元组
  requestFnName, // 请求方法名
  requestImportStatement// 请求方法导入语句
 }
 * @return {String} 输出字符串
 */
function genOutput({
  filePath, // 文件路径
  fileName, // 文件名
  namesTuple, // 名称元组
  requestFnName, // 请求方法名
  requestImportStatement// 请求方法导入语句
}) {
  const configImportStatement = `import { ${namesTuple.map(([CONFIG_OBJ_NAME]) => CONFIG_OBJ_NAME).sort().join(', ')} } from 'Services/api/${fileName}.js'`

  const exportStatement = namesTuple
    .map(([CONFIG_OBJ_NAME, INVOKE_NAME]) => `export const ${INVOKE_NAME} = ${requestFnName}(${CONFIG_OBJ_NAME})`)
    .join(`${eol}${eol}`)

  return render(
    template,
    {
      filePath,
      configImportStatement,
      exportStatement,
      requestImportStatement
    }
  )
}

module.exports = { genOutput }
