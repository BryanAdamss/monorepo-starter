/**
 * @author GuangHui
 * @description 项目配置
 */
const { join } = require('path')

const PKGS_DIR_NAME = 'packages' // packages目录名
const PUBLIC_DIR_NAME = 'public' // 公用资源目录名
const SVG_PKG_NAME = 'svg-assets' // svg包名
const COMP_JSON_NAME = 'components.json' // 组件映射表名

const rootDir = join(__dirname, '.') // 项目根目录

const pkgsDir = join(rootDir, PKGS_DIR_NAME)
const svgPkgDir = join(rootDir, PKGS_DIR_NAME, SVG_PKG_NAME) // svg-assets包目录
const publicDir = join(rootDir, PUBLIC_DIR_NAME)

const componentsJson = join(rootDir, COMP_JSON_NAME) // componentsJson 文件地址

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
  componentsJson
}
