/**
 * @author GuangHui
 * @description lib mdx模板
 */

module.exports = `import { Meta } from '@storybook/addon-docs/blocks';

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
