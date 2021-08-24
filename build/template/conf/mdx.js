/**
 * @author GuangHui
 * @description conf mdx模板
 */

module.exports = `import { Meta } from '@storybook/addon-docs/blocks';

<Meta
  title="Conf/{{prefix}}{{compName}}"
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

\`\`\`js
// config
{
  extends:['@{{scope}}/{{fileName}}']
}
\`\`\``
