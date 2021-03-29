'use strict'

import { print } from '../src/index.js'

describe('@ba/utils', () => {
  it('should be a function', () => {
    expect(typeof print === 'function').toBe(true)
  })
})
