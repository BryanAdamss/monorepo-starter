/**
 * @author GuangHui
 * @description conf readme模板
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

\`\`\`js
// config
{
  extends:['@{{scope}}/{{fileName}}']
}
\`\`\`

## API

具体文档可参考 [Document reference]({{docPath}}).`
