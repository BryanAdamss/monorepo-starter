/**
 * @author GuangHui
 * @description 创建新包
 */

const { log } = require('../shared/tool')
const {
  addOrUpdateCompsJson,
  isDuplicate
} = require('../shared/update-comp')

if (!process.argv[2]) {
  log('[包名]必填 - Please enter new name')
  process.exit(1)
}

if (isDuplicate(process.argv[2])) {
  log(`${process.argv[2]}包已经存在`)
  process.exit(1)
}

const path = require('path')
const fileSave = require('file-save')
const uppercamelcase = require('uppercamelcase')
const { scope, prefix, pkgsDir, publishDir, mdxCategoryMap } = require('../../project.config')
const render = require('json-templater/string')
const eol = require('os').EOL

const { getTplMap } = require('../template')

const fileName = process.argv[2]
const chineseName = process.argv[3] || fileName
const pkgType = process.argv[4] || 'comp'
const compName = uppercamelcase(fileName)
const debug = !!process.argv[5]

const params = {
  scope,
  prefix,
  fileName,
  chineseName,
  compName,
  docPath: `${publishDir}/?path=/docs/${mdxCategoryMap[pkgType].toLowerCase()}-${scope + fileName.replace(/-/g, '').toLowerCase()})`
}

const pkgPath = path.join(pkgsDir, fileName)

const tplMap = getTplMap(pkgType, params)

Object.entries(tplMap).forEach(([key, { tpl, params, name }]) => {
  fileSave(path.join(pkgPath, name))
    .write(render(tpl, params))
    .end(eol)
})

!debug && addOrUpdateCompsJson(fileName, pkgType, chineseName)

log('DONE!')
