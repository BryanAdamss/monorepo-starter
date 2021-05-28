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
npm i @{{scope}}/{{fileName}} --registry=https://artifacts.iflytek.com/artifactory/api/npm/npm-repo/

or

yarn add @{{scope}}/{{fileName}} --registry=https://artifacts.iflytek.com/artifactory/api/npm/npm-repo/
\`\`\`

## Usage

\`\`\`js
import { TODO } from '@{{scope}}/{{fileName}}'
\`\`\`

## API

For more information see the [Document reference](TODO:document link).

`
