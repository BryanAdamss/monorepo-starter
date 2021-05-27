/**
 * @author ghchu
 * @description 开发环境监听svg变化
 */

const { join } = require('path')
const { svgPkgName, publicDirName, packagesDirName } = require('../../component.config')
const chokidar = require('chokidar')
const { execSync } = require('child_process')
const log = console.log.bind(console)

function execCopySvgs(changedPath) {
  log(`-------${changedPath} changed-------`)
  execSync('yarn copy:svgs', {
    cwd: join(packagesDirName, svgPkgName)
  })
}

chokidar
  .watch(`${publicDirName}/svgs/**/*.svg`, {
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 300
    }
  })
  .on('change', execCopySvgs)
