/**
 * @author GuangHui
 * @description assets mdx模板
 */

module.exports = `import { Meta } from '@storybook/addon-docs/blocks';

<Meta
  title="Assets/{{fileName}}"
  parameters={{ previewTabs: { canvas: { hidden: true } },docsOnly:true }}
/>

# @{{scope}}/{{fileName}}

## Install

\`\`\`bash
npm i @{{scope}}/{{fileName}}

or

yarn add @{{scope}}/{{fileName}}
\`\`\`

## Usage

\`\`\`js
// 获取所有资源列表
import AssetsList from '@{{scope}}/{{fileName}}'

// 导入部分资源(以svg示例)
import goTopSvg from '@{{scope}}/{{fileName}}/assets/go-top.svg'

// 批量导入
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(require.context('@{{scope}}/{{fileName}}/assets', false, /\\.svg$/))
\`\`\`
`
