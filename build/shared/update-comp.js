/**
 * @author GuangHui
 * @description 更新组件映射表
 */

const fs = require('fs')
const fileSave = require('file-save')
const { stringify } = require('./tool')
const {
  componentsJson,
  pkgsDirName
} = require('../../project.config')

function updateCompJson(fileName, type) {
  const path = `./${pkgsDirName}/${fileName}`

  if (!fs.existsSync(componentsJson)) {
    fileSave(componentsJson)
      .write(
        stringify({
          [fileName]: {
            type,
            path
          }
        })
      )
  } else {
    const comp = require(componentsJson)

    comp[fileName] = { type, path }

    fileSave(componentsJson)
      .write(stringify(comp))
  }
}

function isDuplicate(fileName) {
  if (!fs.existsSync(componentsJson)) return false

  const comp = require(componentsJson)

  return !!comp && !!comp[fileName]
}

module.exports = {
  updateCompJson,
  isDuplicate
}
