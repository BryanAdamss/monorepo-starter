/**
 * @author GuangHui
 * @description comp mdx模板
 */

module.exports = `<!-- args定义参考:https://storybook.js.org/docs/vue/writing-stories/args -->
<!-- argTypes定义参考:https://storybook.js.org/docs/react/essentials/controls#annotation -->

import {
  Meta,
  Canvas,
  Story,
  ArgsTable,
  Description
} from '@storybook/addon-docs/blocks'
import {{prefix}}{{compName}} from '../src/{{fileName}}.vue'

<!-- 设置 meta 信息 -->

<Meta title="Components/{{prefix}}{{compName}}" component={{{prefix}}{{compName}}} argTypes={{ TODO }} />

<!-- 创建容器组件 -->

export const Template = (args, storyCtx) => ({
  // args包含storybook的所有参数，包含props、slots、listeners
  // storyCtx除了包含args外，还包含更多额外信息
  props: Object.keys(args), // 接收所有args上的参数，并将其定义为props，直接通过this可访问
  mounted() {
    console.log('storyCtx', storyCtx)
    // 修复component name错误
    const {
      parameters: {
        component: { name }
      }
    } = storyCtx
    this._vnode.tag = name || '{{prefix}}{{compName}}'
  },
  render(h) {
    return h({{prefix}}{{compName}}, {
      props: this.$props,
      scopedSlots: {
        // 默认插槽
        default: (props) => {
          // default通过args绑定到props上，所以可以通过this.props直接访问
          return this.default ? h(this.default, { props }) : void 0
        },
        // 具名插槽
        icon: (props) => {
          return this.icon ? h(this.icon, { props }) : void 0
        }
      }
    })
  }
})

# {{prefix}}{{compName}}

<!-- 读取组件描述 -->

<Description of={{{prefix}}{{compName}}} />

## primary

<Canvas>
  <Story name="primary" args={{ TODO }}>
    {Template.bind({})}
  </Story>
</Canvas>

<!-- 主 story，建议设置 ArgsTable -->

<ArgsTable of={{{prefix}}{{compName}}} />

## subStory

<!-- 子 story -->

这里是 subStory 的描述

<Canvas>
  <Story name="subStory" args={{ TODO }}>
    {Template.bind({})}
  </Story>
</Canvas>

## slotStory

<!-- 插槽 story -->

这里是 slotStory 的描述

<!-- 由于story自动生成的code样例无法展示slot，建议通过docs.source.code手动定义 -->

<Canvas>
  <Story
    name="slotIcon"
    args={{
      label: '按钮',
      icon: {
        // 以template形式声明组件
        template: '<span>x</span>'
      }
    }}
    parameters={{
      docs: {
        source: {
          code: \`
<template>
  <{{prefix}}{{compName}}>
    <template #icon>
      <span>x</span>
    </template>
  </{{prefix}}{{compName}}>
</template>\`
        }
      }
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>`
