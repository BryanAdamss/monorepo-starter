/**
 * @author GuangHui
 * @description 项目配置
 */

module.exports = {
  title: 'MONOREPO-STARTER', // 标题
  repository: 'https://github.com/BryanAdamss/monorepo-starter', // 仓库
  scope: 'ba', // @ba/button @ba/utils
  prefix: 'Ba', // 组件名前缀 BaButton BaUtils
  svgPkgName: 'svg-assets', // svg包名
  packagesDirName: 'packages', // packages目录名
  publicDirName: 'public', // 公用资源目录名
  componentsJsonDir: './components.json' // 组件map目录
}
