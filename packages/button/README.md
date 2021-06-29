# `@ba/button`

> 按钮

## Prepare

- `vue@^2.6.12`

## Install

```bash
npm i @ba/button

or

yarn add @ba/button
```

## Usage

```js
import '@hw/button/dist/index.css'
import BaButton from '@ba/button'

// 局部注册
export default {
  components: {
    BaButton
  }
}

// 全局注册，main.js
Vue.component(BaButton)

// 当作插件使用，main.js
Vue.use(BaButton)
```

## API

For more information see the [Document reference](?path=/docs/components-babutton).
