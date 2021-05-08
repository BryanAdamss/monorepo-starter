<template>
  <button
    type="button"
    :class="classes"
    :style="style"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script>

import { print } from '@ba/utils'

export default {
  name: 'BaButton',

  props: {
    label: {
      type: String,
      required: true
    },
    primary: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1
      }
    },
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
      this.$emit('onClick', new Date().getTime())
      console.log('测试@storybook/addon-console')
    }
  }
}
</script>

<style lang="scss" src="./button.scss"></style>
