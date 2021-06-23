/**
 * @author GuangHui
 * @description storybook ui管理
 */
import { addons } from '@storybook/addons'
import theme from './theme-custom'

addons.setConfig({
  theme,
  isFullscreen: false,
  isToolshown: true,
  showNav: true,
  showPanel: true,
  panelPosition: 'bottom',
  enableShortcuts: true,
  sidebar: {
    showRoots: true
  }
})
