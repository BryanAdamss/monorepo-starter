/**
 * @author GuangHui
 * @description cli arg模板
 */

module.exports = `/**
* @author GuangHui
* @description {{fileName}} 参数
*/

module.exports = require('yargs')
 .array('propA')
 .default('propA', ['src/**/*.vue', 'src/**/*.js'])
 .boolean('propB')
 .default('propB', false)`
