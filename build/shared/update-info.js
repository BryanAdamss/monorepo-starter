/**
 * @author GuangHui
 * @description 更新 根README、intro.stories.mdx 相关方法
 */

const fileSave = require('file-save')
const render = require('json-templater/string')

const eol = require('os').EOL

const { transform2PascalCase, prettierMd, prettierMdx } = require('./tool')
const {
  compsJsonDir,
  scope,
  mdxCategoryMap,
  introMdxDir,
  rootReadmeDir,
  title
} = require('../../project.config')

const introMdxTpl = require('../template/intro-mdx')
const rootMdTpl = require('../template/root-readme')

function genMdCompTable(withLink) {
  const cont = Object.entries(require(compsJsonDir))
    .map(
      ([fileName, { type, version, cnName }]) => {
        const pkgName = `@${scope}/${fileName}`

        const row = `| <code>${pkgName}</code> | \`${type}\` | ${cnName} | \`v${version}\` |`
        if (!withLink) return row

        const link = type === 'comp'
          ? `<a onClick={linkTo('${mdxCategoryMap[type]}/${transform2PascalCase(pkgName)}')}>jump</a> |` // comp需要借助storybook addons-link完成跳转
          : `[jump](?path=/story/${mdxCategoryMap[type].toLowerCase()}-${scope + fileName.replace(/-/g, '').toLowerCase()}--page)` // lib、assets类型直接跳转对应页面；例如http://localhost:7007/?path=/story/libs-hwmathquillwrapper--page
        return row + link
      })
    .join(eol)

  const head = withLink
    ? `| 包  | 类型 | 描述 | 版本 | 文档 |
    | --- | ---- | ---- | ---- | ---- |`
    : `| 包  | 类型 | 描述 | 版本 |
    | --- | ---- | ---- | ---- |`

  return `${head}${eol}${cont}`
}

function genMdCompTableWithLink() {
  return genMdCompTable(true)
}

function updateIntroMdx() {
  fileSave(introMdxDir)
    .write(
      prettierMdx(
        render(introMdxTpl, { title, scope, compTableWithLink: genMdCompTableWithLink() })
      )
    )
}

function updateRootMd() {
  fileSave(rootReadmeDir)
    .write(
      prettierMd(
        render(rootMdTpl, { title, scope, compTable: genMdCompTable() })
      )
    )
}

module.exports = {
  genMdCompTable,
  genMdCompTableWithLink,
  updateIntroMdx,
  updateRootMd
}
