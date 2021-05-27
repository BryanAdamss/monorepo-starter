/**
 * @author GuangHui
 * @description 拷贝public/svgs -> packages/svg-assets
 */

const { join, parse } = require('path')
const fileSave = require('file-save')
const eol = require('os').EOL

require('copy')(
  join(__dirname, '../../public/svgs/*'),
  join(__dirname, '../../packages/svg-assets/assets'),
  (err, files) => {
    if (err) throw err

    const nameList = files.reduce((acc, cur) => acc.concat(parse(cur.dest).name), [])

    fileSave(join(__dirname, '../../packages/svg-assets/src/index.js'))
      .write(`/**
* @author GuangHui
* @description svg 列表
*/

export default ${JSON.stringify(nameList).replace(/"/g, '\'').replace(',', ', ')}`).end(eol)

    console.log('copy public/svgs -> packages/svg-assets/assets successed!')
  })
