/**
 * @author ghchu
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
 * 数组转为kv等值的对象
 * @param {Array} array 数组
 * @returns 一个对象，key，value相同
 */
export const mirror = (array) =>
  array.reduce((acc, val) => ({ ...acc, [val]: val }), {})

/**
 * 获取格式数组
 * @param {Boolean} isBrowser 是否浏览器包
 * @returns 对应格式数组
 */
export const getFormats = (isBrowser) =>
  isBrowser ? ['es', 'umd'] : ['es', 'cjs']

/**
 * 获取babel options
 * @returns babel options
 */
export const getBabelOptions = () => ({
  exclude: ['node_modules/**'],
  presets: [['@babel/preset-env', { modules: false }]]
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
export const genConfig = ({ format, INPUT_FILE, OUTPUT_DIR, LERNA_PACKAGE_NAME, ALL_MODULES }) => ({
  input: INPUT_FILE,

  output: {
    file: path.join(OUTPUT_DIR, `index.${format}.js`),
    format,
    sourcemap: false,
    name: LERNA_PACKAGE_NAME,
    globals: mirror(ALL_MODULES),
    amd: {
      id: LERNA_PACKAGE_NAME
    }
  },

  external: ALL_MODULES,

  plugins: [
    nodeResolve(),
    commonjs(),
    babel(getBabelOptions()),
    banner(getBanner()),
    terser(getTerserOptions())
  ]
})

/**
 * 生成vue rollup配置对象
 * @param {Object} obj 参数对象
 * @returns 一个rollup配置对象
 */
export const genVueConfig = ({ format, INPUT_FILE, OUTPUT_DIR, LERNA_PACKAGE_NAME, ALL_MODULES }) => ({
  input: INPUT_FILE,

  output: {
    file: path.join(OUTPUT_DIR, `index.${format}.js`),
    format,
    sourcemap: false,
    name: LERNA_PACKAGE_NAME,
    globals: mirror(ALL_MODULES),
    amd: {
      id: LERNA_PACKAGE_NAME
    }
  },

  external: ALL_MODULES,

  plugins: [
    nodeResolve(),
    commonjs(),
    babel(getBabelOptions()),
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
