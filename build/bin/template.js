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

export default {
  name: '{{prefix}}{{compName}}'
}
</script>

<style lang="scss" src="./{{fileName}}.scss"></style>`

const TPL_PKG = `{
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
   "exports": "./dist/index.modern.js",
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
 
 ## Install
 
 \`\`\`
 const {{fileName}} = require('@{{scope}}/{{fileName}}');
 
 // TODO: DEMONSTRATE API
 \`\`\`
 `

const TPL_SCSS = `@import '../../../sass/_utils';

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

  it('should be xxx', () => {
    // expect(wrapper.xxx).toBe(xxx)
  })
})`

const TPL_STORIES = `import {{prefix}}{{compName}} from '../src/{{fileName}}.vue'

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
  TPL_PKG,
  TPL_README,
  TPL_SCSS,
  TPL_TEST,
  TPL_TEST_LIB,
  TPL_STORIES,
  TPL_INDEX_LIB
}
