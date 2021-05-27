/**
 * @author GuangHui
 * @description 开发环境监听svg变化
 */

const { join } = require('path')
const chokidar = require('chokidar')
const { execSync } = require('child_process')
const {
  svgPkgName,
  publicDirName,
  packagesDirName
} = require('../../project.config')
const { log } = require('../shared/tool')

function execCopySvgs(changedPath, stats) {
  log(`${changedPath} changed`)

  try {
    execSync('yarn copy:svgs', {
      cwd: join(packagesDirName, svgPkgName)
    })
  } catch (error) {
    log('execSync(\'yarn copy:svgs\')失败')
  }
}

const watcher = chokidar
  .watch(`${publicDirName}/svgs/**/*.svg`, {
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 300
    }
  })

watcher.on('ready', (event, path, details) => { // internal
  log('chokidar ready')

  watcher
    .on('add', execCopySvgs)
    .on('change', execCopySvgs)
    .on('unlink', execCopySvgs)
})
