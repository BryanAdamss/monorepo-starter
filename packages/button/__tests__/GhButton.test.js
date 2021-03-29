'use strict'

import { shallowMount } from '@vue/test-utils'

import GhButton from '../src/GhButton.vue'

describe('<GhButton/>', () => {
  const wrapper = shallowMount(GhButton, {
    propsData: {
      label: 'test'
    }
  })

  it('should be button', () => {
    expect(wrapper.element.tagName).toBe('BUTTON')
  })
})
