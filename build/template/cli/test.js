/**
 * @author GuangHui
 * @description cli 单元测试模板
 */

module.exports = `/**
* @author GuangHui
* @description {{fileName}} 单元测试
*/

const {{prefix}}{{compName}} = require('../lib')

describe('{{prefix}}{{compName}}', () => {
  it('should be a function', () => {
    expect(typeof {{prefix}}{{compName}} === 'function').toBe(true)
  })
})`
