'use strict'

const { hello } = require('../src')

describe('@ba/hello', () => {
  it('should be a function', () => {
    expect(typeof hello === 'function').toBe(true)
  })
})
