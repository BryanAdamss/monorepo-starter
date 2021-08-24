/**
 * @author GuangHui
 * @description conf 单元测试模板
 */

module.exports = `/**
* @author GuangHui
* @description {{fileName}} 单元测试
*/

const {{prefix}}{{compName}} = require('../src')

describe('{{prefix}}{{compName}}', () => {
  it('should be a object', () => {
    expect(typeof {{prefix}}{{compName}} === 'object').toBe(true)
  })
})`
