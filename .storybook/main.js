/**
 * @author GuangHui
 * @description storybook 主配置文件（配置插件，入口）
 */

const path = require('path')
const { scope } = require('../project.config')

module.exports = {
  stories: [
    '../packages/intro.stories.mdx', // 默认渲染intro页
    '../packages/**/*.stories.mdx',
    '../packages/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    // @storybook/addon-links用于在不同故事中跳转
    '@storybook/addon-links',
    // @storybook/addon-essentials是一个聚合插件，包含Docs、Controls、Actions、Viewport、Backgrounds、Toolbars & globals插件
    // @storybook/addon-essentials包含了action、controls面板
    // 如果不显示，可能是面板被隐藏了
    // 尝试在启动后，使用按键A、D来切换显示隐藏
    '@storybook/addon-essentials',
    // 用来压制DeprecationWarning: Relying on the implicit PostCSS loader is deprecated and will be removed in Storybook 7.0.If you need PostCSS, include '@storybook/addon-postcss' in your '.storybook/main.js' file.错误
    '@storybook/addon-postcss',
    '@storybook/preset-scss'
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    // 改为直接使用@storybook/preset-scss
    // config.module.rules.push({
    //   test: /\.scss$/,
    //   use: ['style-loader', 'css-loader', 'sass-loader']
    //   // include: path.resolve(__dirname, '../')
    // })

    // add svgo-loader、svg-sprite-loader
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            symbolId: `${scope}-[name]`
          }
        },
        {
          loader: 'svgo-loader',
          options: {
            configFile: path.join(__dirname, '../svgo.config.js')
          }
        }
      ]
      // 方案1
      // 添加include后，将只针对include里面的目录生效
      // 不添加inculde，将针对所有svg文件生效，无论svg文件是否处于node_modules中
      // 所以最佳实践，是不添加include（方案2）
      // include: [
      //   path.join(__dirname, '../public/svgs'),
      //   // 由于使用lerna管理，本地包都相互link了，虽然包已经发布到远程，但依然引用的是本地包，所以使用带有`node_modules`的路径都无法生效；
      //   // 需使用真实路径
      //   path.join(__dirname, '../packages/svg-assets')
      // ]
    })

    // 方案1
    // 内部会使用fileLoader处理svg，需使用exclude排除
    // const fileLoader = config.module.rules.find((rule) =>
    //   rule.test.test('.svg')
    // )

    // fileLoader &&
    //   (fileLoader.exclude = [
    //     path.join(__dirname, '../public/svgs'),
    //     path.join(__dirname, '../packages/svg-assets')
    //   ])

    // 方案2，不添加include、exclude，直接修改test
    // https://github.com/storybookjs/storybook/issues/7360#issuecomment-511009580
    config.module.rules = config.module.rules.map((rule) => {
      if (
        String(rule.test) ===
        // test规则不同版本可能不一致，使用--debug-webpack查看
        String(
          /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
        )
      ) {
        return {
          ...rule,
          test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
        }
      }

      return rule
    })

    // Return the altered config
    return config
  }
}
