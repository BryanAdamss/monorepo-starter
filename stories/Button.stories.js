/**
 * @author GuangHui
 * @description button storybook
 */

import MyButton from '../packages/button/src/Button.vue'

export default {
  title: 'Example/Button', // 设置storybook标题
  component: MyButton, // 使用的组件
  // 配置入参行为(props, slots, inputs, etc等等在storybook中统称为args)
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } }
  }
}

// 创建容器组件
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: '<my-button @clicked="clicked" v-bind="$props" />'
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
