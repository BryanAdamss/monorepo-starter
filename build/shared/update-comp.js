/**
 * @author GuangHui
 * @description 更新组件映射表
 */

const fs = require('fs')
const { join } = require('path')
const fileSave = require('file-save')
const { stringify } = require('./tool')
const {
  componentsJsonDir,
  packagesDirName
} = require('../../project.config')

const input = join(__dirname, '../../', componentsJsonDir)

function updateCompJson(fileName, type) {
  const path = `./${packagesDirName}/${fileName}`

  if (!fs.existsSync(input)) {
    fileSave(input)
      .write(
        stringify({
          [fileName]: {
            type,
            path
          }
        })
      )
  } else {
    const comp = require(input)

    comp[fileName] = { type, path }

    fileSave(input)
      .write(stringify(comp))
  }
}

function isDuplicate(fileName) {
  if (!fs.existsSync(input)) return false

  const comp = require(input)

  return !!comp && !!comp[fileName]
}

module.exports = {
  updateCompJson,
  isDuplicate
}
