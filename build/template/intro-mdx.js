/**
 * @author GuangHui
 * @description intro.stories.mdx 模板
 */

module.exports = `<!-- args定义参考:https://storybook.js.org/docs/vue/writing-stories/args -->
<!-- argTypes定义参考:https://storybook.js.org/docs/react/essentials/controls#annotation -->

import { Meta } from '@storybook/addon-docs/blocks'
import { linkTo } from '@storybook/addon-links'

<Meta
  title="Intro"
  parameters={{ previewTabs: { canvas: { hidden: true } }, docsOnly: true }}
/>

# {{title}}

> monorepo-starter是一个 monorepo 模板工程，提供基于storybook-vue的UI开发体验；

主要对外提供下面几种\`npm包\`

- \`vue组件包\`
  - 基于作业业务开发，适用于\`vue@^2.6.12\`
  - \`type为comp\`
- \`js类库包\`
  - 常用工具方法等
  - \`type为lib\`
- \`资源包\`
  - \`svg\`、\`缺省图\`等等资源
  - \`type为assets\`

## 如何查询？

### 方法一：查看当前页 npm 包列表

我们维护了一个包列表，具体可查看[包列表](#npm-package-list)

## 如何安装？

\`monorepo starter\` 的包全部以\`@ba\`做为\`scope\`，发布到了\`npm 源\`上。
可以通过设置\`npm 源\`的方式安装。

### 方法一：全局切到npm源安装

> 适用于所有包都来自npm源的项目

\`\`\`bash
npm config set registry https://registry.npmjs.org/
npm i @ba/xxx
\`\`\`

### 方法二：单独指定到npm源进行安装

> 适用于同时需要使用npm源、三方源安装包的项目

\`\`\`bash
npm i @ba/xxx --registry=https://registry.npmjs.org/
\`\`\`

### 方法三：指定具体地址安装（推荐）

> 手动声明包解析地址（替换下面例子中的 \`package-name\` 和\`版本号\`）；此方法会固定包的版本，若要升级需要手动调整版本号；

\`\`\`json

// 第一步，在packages.json中指定包和具体版本
{
  "dependencies": {
    "@ba/package-name": "https://registry.npmjs.org/@ba/package-name/download/@ba/package-name-0.11.3.tgz"
  }
}

// 第二部，安装
npm i
\`\`\`

## npm package list

{{compTableWithLink}}

## 贡献者

### 名单

| 账号     | 主页                                                                 |
| ---------- | -------------------------------------------------------------------- |
| \`BryanAdamss\`    | [https://github.com/BryanAdamss](https://github.com/BryanAdamss)       |
`
