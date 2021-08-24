/**
* @author GuangHui
* @description cli-demo 单元测试
*/

const BaCliDemo = require('../lib')

describe('BaCliDemo', () => {
  it('should be a function', () => {
    expect(typeof BaCliDemo === 'function').toBe(true)
  })
})
