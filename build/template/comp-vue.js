/**
 * @author GuangHui
 * @description comp vue组件模板
 */

module.exports = `<template>
  <div class="{{scope}}-{{compName}}" />
</template>

<script>
/**
* 组件描述，此描述将展示在mdx的Description中
* vue的jsdoc注释风格参考：https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api#full-example
*/
export default {
  name: '{{prefix}}{{compName}}'
}
</script>

<style lang="scss" src="./{{fileName}}.scss"></style>`
