/**
 * @author GuangHui
 * @description lib 单元测试模板
 */

module.exports = `import {{prefix}}{{compName}} from '../src'

describe('{{prefix}}{{compName}}', () => {
  it('should be a function', () => {
    expect(typeof {{prefix}}{{compName}} === 'function').toBe(true)
  })
})`
