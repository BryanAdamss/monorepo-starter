<template>
  <button
    class="c-Button"
    @click="handleClick"
  >
    我是按钮
  </button>
</template>

<script>
/**
 * * Button
 */
import './button.css'

import { getMsg } from '@ba/button'

export default {
  name: 'Button',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      alert(getMsg('Button'))
    }
  }
}
</script>

<style src="button.css"></style>
