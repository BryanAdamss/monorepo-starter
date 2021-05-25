/**
 * @author GuangHui
 * @description 开发环境监听lib
 */

const chokidar = require('chokidar')
const path = require('path')
const { execSync } = require('child_process')
const log = console.log.bind(console)

const rootName = 'packages'

chokidar
  .watch(`${rootName}/*/src/**/*.js`, {
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 300
    }
  })
  .on('change', (p) => {
    log(`-------${p} changed-------`)
    const { dir } = path.parse(p)
    const [packagesDir, pkgName] = dir.split(path.sep).slice(0, 2)

    if (packagesDir !== rootName || !pkgName) return

    execSync('yarn jsdoc2mdx', {
      cwd: path.join(packagesDir, pkgName)
    })
  })
