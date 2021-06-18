/**
 * @author GuangHui
 * @description 更新组件映射表
 */

const fs = require('fs')
const fileSave = require('file-save')
const { stringify } = require('./tool')
const {
  compsJsonDir,
  pkgsDirName
} = require('../../project.config')

function updateCompJson(fileName, type) {
  const path = `./${pkgsDirName}/${fileName}`

  if (!fs.existsSync(compsJsonDir)) {
    fileSave(compsJsonDir)
      .write(
        stringify({
          [fileName]: {
            type,
            path
          }
        })
      )
  } else {
    const comp = require(compsJsonDir)

    comp[fileName] = { type, path }

    fileSave(compsJsonDir)
      .write(stringify(comp))
  }
}

function isDuplicate(fileName) {
  if (!fs.existsSync(compsJsonDir)) return false

  const comp = require(compsJsonDir)

  return !!comp && !!comp[fileName]
}

module.exports = {
  updateCompJson,
  isDuplicate
}
