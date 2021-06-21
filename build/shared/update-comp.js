/**
 * @author GuangHui
 * @description 更新组件映射表components.json相关方法
 */

const fs = require('fs')
const fileSave = require('file-save')
const { getPackagesSync } = require('@lerna/project')
const { stringify, log, getFileNameFromPkgName, prettierJson } = require('./tool')
const { join } = require('path')
const {
  compsJsonDir,
  pkgsDirName,
  rootDir,
  pkgsDir
} = require('../../project.config')

function addOrUpdateCompsJson(fileName, type, chineseName) {
  const path = `./${pkgsDirName}/${fileName}`

  if (!fs.existsSync(compsJsonDir)) {
    fileSave(compsJsonDir)
      .write(
        prettierJson(
          stringify({
            [fileName]: {
              type,
              path,
              cnName: chineseName,
              version: '1.0.0' // 初始版本1.0.0
            }
          })
        )
      )
  } else {
    const compsJson = require(compsJsonDir)

    // version字段，在postversion钩子中更新
    compsJson[fileName].type = type
    compsJson[fileName].path = path
    compsJson[fileName].cnName = chineseName

    fileSave(compsJsonDir)
      .write(
        prettierJson(
          stringify(compsJson)
        )
      )
  }
}

function isDuplicate(fileName) {
  if (!fs.existsSync(compsJsonDir)) return false

  const comp = require(compsJsonDir)

  return !!comp && !!comp[fileName]
}

function updateVersions() {
  const compsJson = require(compsJsonDir)
  if (!compsJson) {
    log('components.json 不存在')
    return
  }

  const pkgs = getPackagesSync(rootDir)

  if (!pkgs || !pkgs.length) {
    log('没有读取到任何package')
    return
  }

  pkgs
    .map(pkg => pkg.name)
    .map(getFileNameFromPkgName)// 提取fileName
    .filter(fileName => !!compsJson[fileName]) // 过滤
    .forEach(fileName => {
      const { version } = require(join(pkgsDir, fileName, 'package.json'))

      version && (compsJson[fileName].version = version)
    })

  fileSave(compsJsonDir)
    .write(
      prettierJson(
        stringify(compsJson)
      )
    )
}

module.exports = {
  addOrUpdateCompsJson,
  updateVersions,
  isDuplicate
}
