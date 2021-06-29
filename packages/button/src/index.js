// Import vue component
import Button from './button.vue'

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return

  install.installed = true
  // eslint-disable-next-line vue/match-component-file-name
  Vue.component(Button.name, Button)
}

// Create module definition for Vue.use()
Button.install = install

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) GlobalVue.use(Button)

// To allow use as module (npm/webpack/etc.) export component
export default Button
