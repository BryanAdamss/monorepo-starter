/**
 * @author GuangHui
 * @description 项目配置
 */
const { join } = require('path')

const PKGS_DIR_NAME = 'packages' // packages目录名
const PUBLIC_DIR_NAME = 'public' // 公用资源目录名
const SVG_PKG_NAME = 'svg-assets' // svg包名
const COMP_JSON_NAME = 'components.json' // 组件映射表名
const INTRO_MDX_NAME = 'intro.stories.mdx' // intro文件名
const README_NAME = 'README.md' // readme

// mdx目录映射表
const MDX_CATEGORY_MAP = {
  comp: 'Components',
  lib: 'Libs',
  assets: 'Assets'
}

const rootDir = join(__dirname, '.') // 项目根目录

const pkgsDir = join(rootDir, PKGS_DIR_NAME) // packages目录

const svgPkgDir = join(rootDir, PKGS_DIR_NAME, SVG_PKG_NAME) // svg-assets包目录
const publicDir = join(rootDir, PUBLIC_DIR_NAME) // public 目录
const introMdxDir = join(pkgsDir, INTRO_MDX_NAME) // intro mdx 地址
const compsJsonDir = join(rootDir, COMP_JSON_NAME) // componentsJson 地址
const rootReadmeDir = join(rootDir, README_NAME) // 根root readme 地址

module.exports = {
  title: 'MONOREPO-STARTER', // 标题
  repository: 'https://github.com/BryanAdamss/monorepo-starter', // 仓库地址
  scope: 'ba', // @ba/button @ba/utils
  prefix: 'Ba', // 组件名前缀 BaButton BaUtils
  rootDir,
  svgPkgDir,
  pkgsDir,
  pkgsDirName: PKGS_DIR_NAME,
  publicDir,
  publicDirName: PUBLIC_DIR_NAME,
  introMdxDir,
  introMdxName: INTRO_MDX_NAME,
  rootReadmeDir,
  readmeName: README_NAME,
  compsJsonDir,
  mdxCategoryMap: MDX_CATEGORY_MAP
}
