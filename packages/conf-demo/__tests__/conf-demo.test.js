/**
* @author GuangHui
* @description conf-demo 单元测试
*/

const BaConfDemo = require('../src')

describe('BaConfDemo', () => {
  it('should be a object', () => {
    expect(typeof BaConfDemo === 'object').toBe(true)
  })
})
