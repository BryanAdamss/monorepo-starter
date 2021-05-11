/**
 * @author GuangHui
 * @description 创建新lib包
 */

if (!process.argv[2]) {
  console.error('[包名]必填 - Please enter new name')
  process.exit(1)
}

const path = require('path')
const fileSave = require('file-save')
const uppercamelcase = require('uppercamelcase')
const { scope, prefix } = require('../../component.config')
const render = require('json-templater/string')
const eol = require('os').EOL

const fileName = process.argv[2]
const chineseName = process.argv[3] || fileName
const compName = uppercamelcase(fileName)

const params = {
  scope,
  prefix,
  fileName,
  chineseName,
  compName
}

const {
  TPL_PKG_LIB,
  TPL_README,
  TPL_INDEX_LIB,
  TPL_TEST_LIB
} = require('./template')

const packagePath = path.resolve(__dirname, '../../packages', fileName)

const tplMap = {
  index: {
    tpl: TPL_INDEX_LIB,
    params,
    name: './src/index.js'
  },
  vue: {
    tpl: TPL_TEST_LIB,
    params,
    name: `./__tests__/${fileName}.test.js`
  },
  readme: {
    tpl: TPL_README,
    params,
    name: './README.md'
  },
  package: {
    tpl: TPL_PKG_LIB,
    params,
    name: './package.json'
  }
}

Object.entries(tplMap).forEach(([key, { tpl, params, name }]) => {
  fileSave(path.join(packagePath, name))
    .write(render(tpl, params))
    .end(eol)
})

console.log('DONE!')
