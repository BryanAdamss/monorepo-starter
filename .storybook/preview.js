/**
 * @author GuangHui
 * @description preview配置，用于storybook内部或插件识别
 */

// 支持在actions面板中显示console.log信息
// 由于在main.js的addons中添加此插件会报错，所以直接在此处导入以解决报错问题
import '@storybook/addon-console'

export const parameters = {
  // 设置全局的actions模式，可自动生成action，方便模拟事件处理函数(不用手动编写事件处理函数)
  actions: { argTypesRegex: '^on[A-Z].*' }
}
