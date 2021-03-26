<template>
  <button
    type="button"
    :class="classes"
    :style="style"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script>
import './button.css'

export default {
  name: 'Button',

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
        'c-Button': true,
        'c-Button--primary': this.primary,
        'c-Button--secondary': !this.primary,
        [`c-Button--${this.size}`]: true
      }
    },
    style() {
      return {
        backgroundColor: this.backgroundColor
      }
    }
  },

  methods: {
    onClick() {
      this.$emit('onClick')
    }
  }
}
</script>

<style src="./button.css"></style>
