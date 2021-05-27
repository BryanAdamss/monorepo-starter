/**
 * @author GuangHui
 * @description 拷贝public/svgs -> packages/svg-assets
 */

const { join, parse } = require('path')
const fileSave = require('file-save')
const eol = require('os').EOL
const { svgPkgName } = require('../../component.config')

require('copy')(
  join(__dirname, '../../public/svgs/*'),
  join(__dirname, `../../packages/${svgPkgName}/assets`),
  (err, files) => {
    if (err) throw err

    const nameList = files.reduce((acc, cur) => acc.concat(parse(cur.dest).name), [])

    fileSave(join(__dirname, `../../packages/${svgPkgName}/src/index.js`))
      .write(`/**
* @author ghchu
* @description svg 列表
*/

export default ${JSON.stringify(nameList).replace(/"/g, '\'').replace(',', ', ')}`).end(eol)

    console.log(`copy public/svgs -> packages/${svgPkgName}/assets successed!`)
  })
