/**
 * @author GuangHui
 * @description readme 模板
 */

module.exports = `# \`@{{scope}}/{{fileName}}\`
 
> {{chineseName}}

## Prepare

- \`vue@^2.6.12\`

## Install

\`\`\`bash
npm i @{{scope}}/{{fileName}}

or

yarn add @{{scope}}/{{fileName}}
\`\`\`

## Usage

\`\`\`js
import {{prefix}}{{compName}} from '@{{scope}}/{{fileName}}'
\`\`\`

## API

For more information see the [Document reference]({{docPath}}).`
