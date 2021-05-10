/**
 * @author GuangHui
 * @description 创建新vue组件包
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
  TPL_INDEX,
  TPL_VUE,
  TPL_PKG,
  TPL_README,
  TPL_SCSS,
  TPL_TEST,
  TPL_STORIES_VUE
} = require('./template')

const packagePath = path.resolve(__dirname, '../../packages', fileName)

const tplMap = {
  index: {
    tpl: TPL_INDEX,
    params,
    name: './src/index.js'
  },
  vue: {
    tpl: TPL_VUE,
    params,
    name: `./src/${fileName}.vue`
  },
  readme: {
    tpl: TPL_README,
    params,
    name: './README.md'
  },
  stories: {
    tpl: TPL_STORIES_VUE,
    params,
    name: `./stories/${fileName}.stories.js`
  },
  package: {
    tpl: TPL_PKG,
    params,
    name: './package.json'
  },
  test: {
    tpl: TPL_TEST,
    params,
    name: `./__tests__/${fileName}.test.js`
  },
  scss: {
    tpl: TPL_SCSS,
    params,
    name: `./src/${fileName}.scss`
  }
}

Object.entries(tplMap).forEach(([key, { tpl, params, name }]) => {
  fileSave(path.join(packagePath, name))
    .write(render(tpl, params))
    .end(eol)
})

console.log('DONE!')
