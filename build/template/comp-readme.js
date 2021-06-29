/**
 * @author GuangHui
 * @description comp readme 模板
 */

module.exports = `# \`@{{scope}}/{{fileName}}\`
 
> {{chineseName}}

## 需要环境

- \`vue@^2.6.12\`

## 安装

\`\`\`bash
npm i @{{scope}}/{{fileName}}

or

yarn add @{{scope}}/{{fileName}}
\`\`\`

## 使用

\`\`\`js
import '@{{scope}}/{{fileName}}/dist/index.css' // TODO check if need?
import {{prefix}}{{compName}} from '@{{scope}}/{{fileName}}'

// 局部注册
export default {
  components: {
    {{prefix}}{{compName}}
  }
}

// 全局注册，main.js
Vue.component({{prefix}}{{compName}})

// 当作插件使用，main.js
Vue.use({{prefix}}{{compName}})
\`\`\`

## API

具体文档可参考 [Document reference]({{docPath}}).`
