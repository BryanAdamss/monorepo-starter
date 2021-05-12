<template>
  <div
    :class="classes"
    :style="style"
    @click="handleClick"
  >
    <!-- @slot icon插槽 -->
    <slot name="icon">✔</slot>

    <!-- @slot 默认插槽；对外暴露label变量 -->
    <slot :label="label">{{ label }}</slot>
  </div>
</template>

<script>

import { print } from '@ba/utils'

/**
 * 组件描述，此描述将展示在mdx的Description中
 */
export default {
  name: 'BaButton',

  props: {
    /**
     * 文案
     */
    label: {
      type: String,
      required: true
    },
    /**
     * 类型
     */
    primary: {
      type: Boolean,
      default: false
    },
    /**
     * 尺寸
     */
    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1
      }
    },
    /**
     * 背景色
     */
    backgroundColor: {
      type: String,
      default: '#05c1ae'
    }
  },

  computed: {
    classes() {
      return {
        'ba-Button': true,
        'ba-Button--primary': this.primary,
        'ba-Button--secondary': !this.primary,
        [`ba-Button--${this.size}`]: true
      }
    },
    style() {
      return {
        backgroundColor: this.backgroundColor
      }
    }
  },

  methods: {
    handleClick() {
      print('BaButton')
      /**
       * 点击事件
       *
       * @event onClick
       */
      this.$emit('onClick', new Date().getTime())
      console.log('测试@storybook/addon-console')
    }
  }
}
</script>

<style lang="scss" src="./button.scss"></style>
