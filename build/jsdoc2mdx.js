/**
 * @author GuangHui
 * @description jsdoc2mdx
 */

const fs = require('fs')
const path = require('path')
const jsdoc2md = require('jsdoc-to-markdown')

const { LERNA_PACKAGE_NAME } = process.env

const PACKAGE_ROOT_PATH = process.cwd()
const input =  path.join(PACKAGE_ROOT_PATH, 'src/*.js')
const outputDir = path.join(PACKAGE_ROOT_PATH,'stories')
const name = LERNA_PACKAGE_NAME.split('/')[1]

// 清除缓存
jsdoc2md.clear()

// 创建outputdir
if(!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)

const templateData = jsdoc2md.getTemplateDataSync({ files: input })

const storyMdxMeta = `
import { Meta } from '@storybook/addon-docs/blocks';

<Meta
  title="Libs/${name}"
  parameters={{ previewTabs: { canvas: { hidden: true } },docsOnly:true }}
/>
`
const output = jsdoc2md.renderSync({ data: templateData })

fs.writeFileSync(
  path.resolve(outputDir, `${name}.stories.mdx`),
  `${storyMdxMeta}\r\n${output}`
)
