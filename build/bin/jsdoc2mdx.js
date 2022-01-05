/**
 * @author GuangHui
 * @description jsdoc2mdx
 */

const fs = require('fs')
const path = require('path')
const eol = require('os').EOL
const fileSave = require('file-save')
const jsdoc2md = require('jsdoc-to-markdown')
const render = require('json-templater/string')
const { scope } = require('../../project.config')
const { log, prettierMdx } = require('../shared/tool')

const libMdxTpl = require('../template/lib/mdx')

const { LERNA_PACKAGE_NAME } = process.env

const PACKAGE_ROOT_PATH = process.cwd()
const input = path.join(PACKAGE_ROOT_PATH, 'src/**/*.{js,ts}')

const outputDir = path.join(PACKAGE_ROOT_PATH, 'stories')
const fileName = LERNA_PACKAGE_NAME.split('/')[1]
const outputFile = path.join(outputDir, `${fileName}.stories.mdx`)
const jsdocConfigFile = path.join(__dirname, '../../jsdoc.config.js')

function getJsdoc2mdContent() {
  // 清除缓存
  jsdoc2md.clear()

  const templateData = jsdoc2md.getTemplateDataSync({
    files: input,
    configure: jsdocConfigFile
  })

  return jsdoc2md.renderSync({ data: templateData })
}

function save(content) {
  fileSave(outputFile)
    .write(prettierMdx(content))
}

function create() {
  log('create jsdoc2md content')

  save(
    render(
      libMdxTpl,
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

  log('update jsdoc2md content')

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

log(`${LERNA_PACKAGE_NAME} exec jsdoc2md DONE!`)
