/**
 * @author GuangHui
 * @description 开发环境监听lib变化
 */

const chokidar = require('chokidar')
const path = require('path')
const { execSync } = require('child_process')
const { packagesDirName } = require('../../project.config')
const { log } = require('../shared/log')

function execJsDoc2mdx(changedPath) {
  log(`${changedPath} changed`)
  const { dir } = path.parse(changedPath)
  const [packagesDir, pkgName] = dir.split(path.sep).slice(0, 2)

  if (packagesDir !== packagesDirName || !pkgName) return

  execSync('yarn jsdoc2mdx', {
    cwd: path.join(packagesDir, pkgName)
  })
}

chokidar
  .watch(`${packagesDirName}/*/src/**/*.js`, {
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 300
    }
  })
  .on('change', execJsDoc2mdx)
