/**
 * @author GuangHui
 * @description jsdoc2mdx
 */

const fs = require('fs')
const path = require('path')
const jsdoc2md = require('jsdoc-to-markdown')
const fileSave = require('file-save')
const render = require('json-templater/string')
const { scope } = require('../../component.config')
const eol = require('os').EOL

const { TPL_STORIES_MDX_LIB } = require('./template')

const { LERNA_PACKAGE_NAME } = process.env

const PACKAGE_ROOT_PATH = process.cwd()
const input = path.join(PACKAGE_ROOT_PATH, 'src/*.js')
const outputDir = path.join(PACKAGE_ROOT_PATH, 'stories')
const fileName = LERNA_PACKAGE_NAME.split('/')[1]
const outputFile = path.resolve(outputDir, `${fileName}.stories.mdx`)

function getJsdoc2mdContent() {
  // 清除缓存
  jsdoc2md.clear()

  const templateData = jsdoc2md.getTemplateDataSync({ files: input })

  return jsdoc2md.renderSync({ data: templateData })
}

function save(content) {
  fileSave(outputFile)
    .write(content)
    .end(eol)
}

function create() {
  save(
    render(
      TPL_STORIES_MDX_LIB,
      {
        scope,
        fileName,
        jsdoc2mdContent: getJsdoc2mdContent()
      }
    )
  )
}

function update() {
  const old = fs.readFileSync(outputFile, 'utf-8')

  if (!old) return

  const newOne = old.replace(
    /(<!-- jsdoc2mdContentTag -->).*(<!-- jsdoc2mdContentTagEnd -->)/gs,
    '$1' + eol + getJsdoc2mdContent() + eol + '$2'
  )

  save(newOne)
}

if (!fs.existsSync(outputDir)) {
  // 创建outputdir
  fs.mkdirSync(outputDir)

  create()
} else {
  if (fs.existsSync(outputFile)) {
    update()
  } else {
    create()
  }
}
