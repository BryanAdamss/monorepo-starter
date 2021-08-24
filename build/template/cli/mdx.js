/**
 * @author GuangHui
 * @description cli mdx模板
 */

module.exports = `import { Meta } from '@storybook/addon-docs/blocks';

<Meta
  title="Cli/{{prefix}}{{compName}}"
  parameters={{ previewTabs: { canvas: { hidden: true } },docsOnly:true }}
/>

# @{{scope}}/{{fileName}}

> {{chineseName}}

## 安装

\`\`\`bash
npm i @{{scope}}/{{fileName}} 

or

yarn add @{{scope}}/{{fileName}} 
\`\`\`

## 使用

### 通过cli使用

\`\`\`json
{
  "scripts": {
    "{{fileName}}": "{{fileName}} --propA src/**/*.vue src/**/*.js --propB  "
  }
}
\`\`\`

### 通过function使用
\`\`\`js
const {{prefix}}{{compName}} = require('@{{scope}}/{{fileName}}')

{{prefix}}{{compName}}({
  propA: ['src/**/*.vue'],
  propB:true
})
\`\`\`

### 可用参数及默认值

\`\`\`
{
  propA = ['src/**/*.vue', 'src/**/*.js'],
  propB = false
}
\`\`\``
