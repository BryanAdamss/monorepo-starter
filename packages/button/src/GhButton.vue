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

export default {
  name: 'GhButton',

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
        'c-GhButton': true,
        'c-GhButton--primary': this.primary,
        'c-GhButton--secondary': !this.primary,
        [`c-GhButton--${this.size}`]: true
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
      this.$emit('onClick', new Date().getTime())
      console.log('测试@storybook/addon-console')
    }
  }
}
</script>

<style src="./GhButton.css"></style>
