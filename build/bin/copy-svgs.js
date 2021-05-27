/**
 * @author GuangHui
 * @description 拷贝public/svgs -> packages/svg-assets
 */

const { join, parse } = require('path')
const fileSave = require('file-save')
const eol = require('os').EOL
const { svgPkgName, packagesDirName, publicDirName } = require('../../project.config')
const { log } = require('../shared/tool')

require('copy')(
  join(__dirname, `../../${publicDirName}/svgs/*`),
  join(__dirname, `../../${packagesDirName}/${svgPkgName}/assets`),
  (err, files) => {
    if (err) throw err

    const nameList = files.reduce((acc, cur) => acc.concat(parse(cur.dest).name), [])

    // 更新index.js
    fileSave(join(__dirname, `../../${packagesDirName}/${svgPkgName}/src/index.js`))
      .write(`/**
* @author GuangHui
* @description svg 列表
*/

export default ${JSON.stringify(nameList).replace(/"/g, '\'').replace(',', ', ')}`).end(eol)

    log(`copy ${publicDirName}/svgs -> ${packagesDirName}/${svgPkgName}/assets successed!`)
  })
