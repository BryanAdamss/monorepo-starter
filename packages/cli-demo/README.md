# `@ba/cli-demo`
 
> cli例子

## 需要环境

- `node >= 14.15.1`

## 安装

```bash
npm i @ba/cli-demo 

or

yarn add @ba/cli-demo 
```

## 使用

### 通过cli使用

```json
{
  "scripts": {
    "cli-demo": "cli-demo --propA src/**/*.vue src/**/*.js --propB  "
  }
}
```

### 通过function使用
```js
const BaCliDemo = require('@ba/cli-demo')

BaCliDemo({
  propA: ['src/**/*.vue'],
  propB:true
})
```

### 可用参数及默认值

```
{
  propA = ['src/**/*.vue', 'src/**/*.js'],
  propB = false
}
```

## API

具体文档可参考 [Document reference](./?path=/docs/cli-baclidemo).
