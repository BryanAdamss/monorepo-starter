/**
 * @author GuangHui
 * @description 模板
 */

const TPL_INDEX = `// Import vue component
import {{compName}} from './{{fileName}}.vue'

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return

  install.installed = true
  // eslint-disable-next-line vue/match-component-file-name
  Vue.component({{compName}}.name, {{compName}})
}

// Create module definition for Vue.use()
const plugin = {
  install
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) GlobalVue.use(plugin)

// To allow use as module (npm/webpack/etc.) export component
export default {{compName}}`

const TPL_VUE = `<template>
  <div class="{{scope}}-{{compName}}" />
</template>

<script>
/**
 * 组件描述，此描述将展示在mdx的Description中
 * vue的jsdoc注释风格参考：https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api#full-example
 */
export default {
  name: '{{prefix}}{{compName}}'
}
</script>

<style lang="scss" src="./{{fileName}}.scss"></style>`

const TPL_PKG_VUE = `{
   "name": "@{{scope}}/{{fileName}}",
   "version": "1.0.0",
   "description": "A vue {{fileName}} component",
   "author": {
    "name": "GuangHui",
    "email": "bryanadamss@foxmail.com",
    "url": "https://github.com/BryanAdamss"
  },
   "homepage": "https://github.com/BryanAdamss/monorepo-starter#readme",
   "license": "MIT",
   "main": "./dist/index.cjs.js",
   "exports": {
     "import":"./dist/index.modern.mjs",
     "require":"./dist/index.cjs.js"
   },
   "module": "./dist/index.es.js",
   "browser": "./dist/index.umd.js",
   "unpkg": "./dist/index.umd.js",
   "scripts": {
     "build": "lerna exec --scope @{{scope}}/{{fileName}} -- rollup -c=../../build/vue.js"
   },
   "directories": {
     "lib": "lib",
     "test": "__tests__"
   },
   "files": [
     "dist"
   ],
   "publishConfig": {
     "access": "public",
     "registry": "https://registry.npmjs.org/"
   },
   "repository": {
     "type": "git",
     "url": "git+https://github.com/BryanAdamss/monorepo-starter.git"
   },
   "bugs": {
     "url": "https://github.com/BryanAdamss/monorepo-starter/issues"
   }
 }`

const TPL_PKG_LIB = `{
  "name": "@{{scope}}/{{fileName}}",
  "version": "1.0.0",
  "description": "A {{fileName}}",
  "author": {
   "name": "GuangHui",
   "email": "bryanadamss@foxmail.com",
   "url": "https://github.com/BryanAdamss"
 },
  "homepage": "https://github.com/BryanAdamss/monorepo-starter#readme",
  "license": "MIT",
  "main": "./dist/index.cjs.js",
  "exports": {
    "import":"./dist/index.modern.mjs",
    "require":"./dist/index.cjs.js"
  },
  "module": "./dist/index.es.js",
  "browser": "./dist/index.umd.js",
  "unpkg": "./dist/index.umd.js",
  "scripts": {
    "build": "lerna exec --scope @{{scope}}/{{fileName}} -- rollup -c ../../build/base.js",
    "jsdoc2mdx": "lerna exec --scope @{{scope}}/{{fileName}} -- node ../../build/bin/jsdoc2mdx.js"
  },
  "directories": {
    "lib": "lib",
    "test": "__tests__"
  },
  "files": [
    "dist"
  ],
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/BryanAdamss/monorepo-starter.git"
  },
  "bugs": {
    "url": "https://github.com/BryanAdamss/monorepo-starter/issues"
  }
}`

const TPL_README = `# \`@{{scope}}/{{fileName}}\`
 
 > {{chineseName}}
 
 ## Prepare
 - \`vue@^2.6.12\`

 ## Install
 
\`\`\`bash
 npm i @{{scope}}/{{fileName}}

 or

 yarn add @{{scope}}/{{fileName}}
\`\`\`

 ## API
 For more information see the [Document reference](TODO:document link).

 `

const TPL_SCSS = `@import '../../../public/sass/_utils';

.{{scope}}-{{compName}} {
  &-hd {
  }

  &-bd {
  }

  &-ft {
  }
}`

const TPL_TEST = `/**
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

const TPL_STORIES_VUE = `import {{prefix}}{{compName}} from '../src/{{fileName}}.vue'

export default {
  title: 'Components/{{prefix}}{{compName}}', // 设置storybook标题
  component: {{prefix}}{{compName}}, // 使用的组件
  // 配置入参行为(props, slots, inputs, etc等等在storybook中统称为args)
  argTypes: {
    // backgroundColor: { control: 'color' },
    // size: { control: { type: 'select', options: ['small', 'medium', 'large'] } }
  }
}

// 创建容器组件
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { {{prefix}}{{compName}} },
  template: '<{{prefix}}{{compName}} v-bind="$props" />'
})

export const Primary = Template.bind({}) // 使用bind({})，克隆一个新函数，创建一个新story
Primary.args = {
  // primary: true,
  // label: 'Button'
}

// export const Secondary = Template.bind({})
// Secondary.args = {
// label: 'Button'
// }`

const TPL_STORIES_MDX_VUE = `<!-- args定义参考:https://storybook.js.org/docs/vue/writing-stories/args -->
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
<Meta
  title="Components/{{prefix}}{{compName}}"
  component={{{prefix}}{{compName}}}
  argTypes={{ TODO }}
/>

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

这里是subStory的描述

<Canvas>
  <Story
    name="subStory"
    args={{ TODO }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

## slotStory
<!-- 插槽 story -->

这里是slotStory的描述

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

const TPL_STORIES_MDX_LIB = `import { Meta } from '@storybook/addon-docs/blocks';

<Meta
  title="Libs/{{fileName}}"
  parameters={{ previewTabs: { canvas: { hidden: true } },docsOnly:true }}
/>

# @{{scope}}/{{fileName}}

## Install

\`\`\`bash
npm i @{{scope}}/{{fileName}} --registry=https://artifacts.iflytek.com/artifactory/api/npm/npm-repo/

or

yarn add @{{scope}}/{{fileName}} --registry=https://artifacts.iflytek.com/artifactory/api/npm/npm-repo/
\`\`\`

## Usage

\`\`\`js
import { TODO } from '@{{scope}}/{{fileName}}'
\`\`\`

## API

<!-- jsdoc2mdContentTag -->

{{jsdoc2mdContent}}

<!-- jsdoc2mdContentTagEnd -->
`

const TPL_TEST_LIB = `import { xxx } from '../src'

describe('xxx', () => {
  it('should be a function', () => {
    expect(typeof xxx === 'function').toBe(true)
  })
})`

const TPL_INDEX_LIB = `/**
* @author GuangHui
* @description {{fileName}}
*/

/**
* 描述
*
* @date 2021-04-19 20:39:49
* @export
* @param {string} msg 入参描述
* @return {string} 返回描述
*/
export function xxx(msg) {
  return msg
}`

module.exports = {
  TPL_INDEX,
  TPL_VUE,
  TPL_PKG_VUE,
  TPL_PKG_LIB,
  TPL_README,
  TPL_SCSS,
  TPL_TEST,
  TPL_TEST_LIB,
  TPL_STORIES_VUE,
  TPL_STORIES_MDX_VUE,
  TPL_INDEX_LIB,
  TPL_STORIES_MDX_LIB
}
