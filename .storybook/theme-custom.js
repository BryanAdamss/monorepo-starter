/**
 * @author GuangHui
 * @description 自定义主题，具体见https://storybook.js.org/docs/vue/configure/theming
 */

import { create } from '@storybook/theming'

import { title, repository } from '../project.config'

export default create({
  base: 'light',

  brandTitle: title,
  brandUrl: repository
})
