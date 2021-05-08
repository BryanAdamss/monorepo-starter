/**
* @author GuangHui
* @description button
*/

'use strict'

import { shallowMount } from '@vue/test-utils'

import Button from '../src/button.vue'

describe('<Button/>', () => {
  const wrapper = shallowMount(Button, {
    propsData: {
      label: 'test'
    }
  })

  it('should be button', () => {
    expect(wrapper.element.tagName).toBe('BUTTON')
  })
})
