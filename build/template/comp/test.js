/**
 * @author GuangHui
 * @description comp 单元测试模板
 */

module.exports = `/**
* @author GuangHui
* @description {{fileName}}
*/

'use strict'

import { shallowMount } from '@vue/test-utils'

import {{prefix}}{{compName}} from '../src/{{fileName}}.vue'

describe('<{{prefix}}{{compName}}/>', () => {
  const wrapper = shallowMount({{prefix}}{{compName}}, {
    propsData: {}
  })

  it('should be DIV', () => {
    expect(wrapper.element.tagName).toBe('DIV')
  })
})`
