/**
 * @author GuangHui
 * @description 构建工具函数
 */
import { getPackagesSync } from '@lerna/project'
import path from 'path'
import babel from 'rollup-plugin-babel'
import banner from 'rollup-plugin-banner'
import commonjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-only'
import nodeResolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'

/**
  * 获取所有模块（包）名数组
  * @param {String} root 根路径
  * @returns 模块（包）名数组
  */
export const getAllModules = (root) =>
  getPackagesSync(root).map(pkg => pkg.name)

/**
 * 转换为PascalCase格式
 * @param {String} str 字符串
 * @returns 转后后的字符串
 * @example
 * transform2PascalCase('@ba/utils')
 * => BaUtils
 */
export const transform2PascalCase = str =>
  str.replace(/@/g, '')
    .split('/')
    .filter(token => !!token)
    .map(token => token.charAt(0).toUpperCase() + token.substring(1))
    .join('')

/**
* 生成全局对象
* @param {Array} array 数组
* @returns 一个对象，key，value相同
*/
export const genGlobals = (array) =>
  array.reduce((acc, val) => ({ ...acc, [val]: transform2PascalCase(val) }), {})

/**
  * 获取格式数组
  * @param {Boolean} isBrowser 是否浏览器包
  * @returns 对应格式数组
  */
export const getFormats = isBrowser =>
  isBrowser ? ['es', 'umd', 'cjs', 'modern'] : ['es', 'cjs', 'modern']

/**
  * 是否modern包
  * @param {String} format 格式
  * @returns {Boolean} 是否modern包
  */
export const isModern = format => format === 'modern'

/**
  * 获取babel options
  * @returns babel options
  */
export const getBabelOptions = isModern => ({
  exclude: ['node_modules/**'],
  presets: [[
    '@babel/preset-env', isModern
      ? {
          modules: false,
          targets: { esmodules: true },
          bugfixes: true,
          loose: true
        }
      : { modules: false }
  ]]
})

/**
  * 生成版权banner
  * @returns 版权banner
  */
export const getBanner = () => 'banner\n<%= pkg.name %>\nv<%= pkg.version %>\nby <%= pkg.author %>\nLicense:<%= pkg.license %>\n<%= pkg.homepage%>'

/**
  * 获取terser options
  * @returns terser options
  */
export const getTerserOptions = () => ({
  output: {
    comments(node, { value, type }) {
      return type === 'comment2' ? /banner/i.test(value) : false
    }
  }
})

/**
  * 生成基础rollup配置对象
  * @param {Object} obj 参数对象
  * @returns 一个rollup配置对象
  */
export const genConfig = ({ format, external, INPUT_FILE, OUTPUT_DIR, LERNA_PACKAGE_NAME, ALL_MODULES }) => ({
  input: INPUT_FILE,

  output: {
    file: path.join(OUTPUT_DIR, `index.${format}.js`),
    format: isModern(format) ? 'es' : format, // modern包以es格式输出
    sourcemap: false,
    name: transform2PascalCase(LERNA_PACKAGE_NAME),
    globals: genGlobals(ALL_MODULES),
    amd: {
      id: LERNA_PACKAGE_NAME
    },
    exports: 'named'
  },

  external,

  plugins: [
    nodeResolve(),
    commonjs(),
    babel(getBabelOptions(isModern(format))),
    banner(getBanner()),
    terser(getTerserOptions())
  ]
})

/**
  * 生成vue rollup配置对象
  * @param {Object} obj 参数对象
  * @returns 一个rollup配置对象
  */
export const genVueConfig = ({ format, external, INPUT_FILE, OUTPUT_DIR, LERNA_PACKAGE_NAME, ALL_MODULES }) => ({
  input: INPUT_FILE,

  output: {
    file: path.join(OUTPUT_DIR, `index.${format}.js`),
    format: isModern(format) ? 'es' : format, // modern包以es格式输出
    sourcemap: false,
    name: transform2PascalCase(LERNA_PACKAGE_NAME),
    globals: genGlobals(ALL_MODULES),
    amd: {
      id: LERNA_PACKAGE_NAME
    },
    exports: 'named'
  },

  external,

  plugins: [
    nodeResolve(),
    commonjs(),
    babel(getBabelOptions(isModern(format))),
    vue({
      css: false, // 不内联css，提取css并使用rollup-plugin-css-only处理css；https://rollup-plugin-vue.vuejs.org/migrating.html
      compileTemplate: true // 使用把template编译为render函数
    }),
    css({
      output: 'index.css'
    }),
    banner(getBanner()),
    terser(getTerserOptions())
  ]
})
