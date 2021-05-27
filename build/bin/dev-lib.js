/**
 * @author GuangHui
 * @description 开发环境监听lib变化
 */

const path = require('path')
const chokidar = require('chokidar')
const { execSync } = require('child_process')
const { packagesDirName } = require('../../project.config')
const { log } = require('../shared/tool')
const compsMap = require('../../components.json')

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

function getLibPath() {
  return Object.entries(compsMap)
    .reduce(
      (acc, [key, { type, path }]) => type === 'lib' ? acc.concat(path) : acc, []
    ).map(p => `${p}/src/**/*.js`)
}

const watcher = chokidar.watch(
  getLibPath(),
  {
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 300
    }
  })

watcher
  .on('ready', () => {
    watcher
      .on('add', execJsDoc2mdx)
      .on('change', execJsDoc2mdx)
      .on('unlink', execJsDoc2mdx)
  })
