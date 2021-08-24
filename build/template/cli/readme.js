/**
 * @author GuangHui
 * @description cli readme模板
 */

module.exports = `# \`@{{scope}}/{{fileName}}\`
 
> {{chineseName}}

## 需要环境

- \`node >= 14.15.1\`

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
\`\`\`

## API

具体文档可参考 [Document reference]({{docPath}}).`
