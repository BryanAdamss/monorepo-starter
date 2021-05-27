/**
 * @author GuangHui
 * @description 开发环境监听lib变化
 */

const chokidar = require('chokidar')
const path = require('path')
const { execSync } = require('child_process')
const { packagesDirName } = require('../../project.config')
const { log } = require('../shared/tool')

function execJsDoc2mdx(changedPath) {
  log(`${changedPath} changed`)

  const { dir } = path.parse(changedPath)
  const [packagesDir, pkgName] = dir.split(path.sep).slice(0, 2)

  if (packagesDir !== packagesDirName || !pkgName) return

  try {
    execSync('yarn jsdoc2mdx', {
      cwd: path.join(packagesDir, pkgName)
    })
  } catch (error) {
    log('execSync(\'yarn jsdoc2mdx\')失败')
  }
}

chokidar
  .watch(`${packagesDirName}/*/src/**/*.js`, {
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 300
    }
  })
  .on('change', execJsDoc2mdx)
