/**
 * @author GuangHui
 * @description button storybook
 */

import GhButton from '../packages/button/src/GhButton.vue'

export default {
  title: 'Example/GhButton', // 设置storybook标题
  component: GhButton, // 使用的组件
  // 配置入参行为(props, slots, inputs, etc等等在storybook中统称为args)
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } }
  }
}

// 创建容器组件
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GhButton },
  template: '<gh-button @onClick="onClick" v-bind="$props" />'
})

export const Primary = Template.bind({}) // 使用bind({})，克隆一个新函数，创建一个新story
Primary.args = {
  primary: true,
  label: 'Button'
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button'
}
