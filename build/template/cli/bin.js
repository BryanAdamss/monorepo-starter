/**
 * @author GuangHui
 * @description cli bin模板
 */

module.exports = `/**
* @author GuangHui
* @description {{fileName}} bin
*/

const { argv } = require('./arg.js')

require('./index')(argv)`
