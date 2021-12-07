# `@ba/gen-request`

> 根据 api 配置，自动生成请求方法；建议配合@ba/api-builder 使用

## 需要环境

- `vue@^2.6.12`

## 安装

```bash
npm i @ba/gen-request

or

yarn add @ba/gen-request
```

## 使用

### cli

默认是`watch`默认，当`patterns`文件变动时，会自动生成新的文件。

```json
{
  "scripts": {
    "gen-request": "gen-request --patterns src/services/api/*.js src/other/dir/*.js --output src/services/request --debug --requestFnName axiosFn --requestImportStatement import { apiBuilderInstance --watch} from 'Services/extends/api-builder-instance.js'"
  }
}
```

### 使用 function

适合在需要生成多个请求实例方法的场景

```js
const HwGenRequest = require('@ba/gen-request')

HwGenRequest({
  patterns = ['src/services/api/*.js'], // 默认搜索src/services/api/*.js
  globbyOptions = {}, // 自定义globby的选项，会覆盖默认的选项
  requestFnName = 'apiBuilderInstance.create', // 请求方法名
  requestImportStatement = 'import { apiBuilderInstance } from \'Services/extends/api-builder-instance.js\'', // 请求方法导入语句,
  outputDir = './src/services/request',
  debug = false // 调试模式开关，为true输出相关log且不会写文件
})
```

### 可用参数及默认值

```
{
  patterns = ['src/services/api/*.js'], // 默认搜索src/services/api/*.js
  globbyOptions = {}, // 自定义globby的选项，会覆盖默认的选项
  requestFnName = 'apiBuilderInstance.create', // 请求方法名
  requestImportStatement = 'import { apiBuilderInstance } from \'Services/extends/api-builder-instance.js\'', // 请求方法导入语句,
  outputDir = './src/services/request',
  debug = false // 调试模式开关，为true输出相关log且不会写文件
}
```

## API

具体文档可参考 [Document reference](//hwtest.zhixue.com/hw-fe/cbb/?path=/docs/libs-hwgenrequest).
