/**
 * @author GuangHui
 * @description rollup 工具函数
 */
import { getPackagesSync } from '@lerna/project'
import { isEqual, uniqWith } from 'lodash'
import path from 'path'
import babel from 'rollup-plugin-babel'
import banner from 'rollup-plugin-banner'
import commonjs from 'rollup-plugin-commonjs'
import img from 'rollup-plugin-img'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'

import { transform2PascalCase } from './shared/tool'

/**
 * 出口字段
 */
export const PKG_FIELDS = ['main', 'exports', 'module', 'browser', 'unpkg']

/**
 * 生成formats数组
 *
 * @date 2021-05-11 18:36:55
 * @export
 * @param {Object} pkg package.json
 * @return {Array}  format数组
 */
export function getFormats(pkg) {
  const formats = PKG_FIELDS.reduce((acc, cur) => {
    if (!pkg[cur]) return acc

    const file = pkg[cur]

    switch (cur) {
      case 'main':
        acc.push({ format: 'cjs', file })
        break
      case 'module':
        acc.push({ format: 'es', file })
        break
      case 'exports':
        if (typeof file === 'string' || (file && file.import)) {
          const f = typeof file === 'string' ? file : file.import

          acc.push({ format: 'es', file: f, isModern: true })

          // 为支持直接导入module的浏览器生成.js后缀的modern包
          if (/\.mjs$/.test(f)) acc.push({ format: 'es', file: f.replace(/\.m(js)$/, '.$1'), isModern: true })
        }

        if (file && file.require) acc.push({ format: 'cjs', file: file.require })

        break
      case 'unpkg':
      case 'browser':
        acc.push({ format: 'umd', file })
        break
      default:
        acc.push({ format: 'cjs', file })
        break
    }

    return acc
  }, [])

  // 去重
  return uniqWith(formats, isEqual)
}

/**
  * 获取所有模块（包）名数组
  * @param {String} root 根路径
  * @returns 模块（包）名数组
  */
export const getAllModules = (root) =>
  getPackagesSync(root).map(pkg => pkg.name)

/**
* 生成全局对象
* @param {Array} array 数组
* @returns 一个对象，key，value相同
*/
export const genGlobals = (array) =>
  array.reduce((acc, val) => ({ ...acc, [val]: transform2PascalCase(val) }), {})

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
export const getBanner = () => 'banner\n<%= pkg.name %>\nv<%= pkg.version %>\nby <%= pkg.author.name %>\nLicense:<%= pkg.license %>\n<%= pkg.homepage%>'

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
export const genLibConf = ({ format, file, isModern, external, globals, INPUT_FILE, PACKAGE_ROOT_PATH, LERNA_PACKAGE_NAME }) => ({
  input: INPUT_FILE,

  output: {
    file: path.join(PACKAGE_ROOT_PATH, file),
    format,
    sourcemap: false,
    name: transform2PascalCase(LERNA_PACKAGE_NAME),
    globals,
    amd: {
      id: LERNA_PACKAGE_NAME
    },
    exports: 'named'
  },

  external,

  plugins: [
    nodeResolve(),
    commonjs(),
    babel(getBabelOptions(isModern)),
    banner(getBanner()),
    img({
      output: 'dist', // default the root
      extensions: /\.(png|jpg|jpeg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
      limit: 8192, // default 8192(8k)，低于8K的内联
      _slash: true // 启用相对路径
      // exclude: 'node_modules/**'
    }),
    terser(getTerserOptions())
  ]
})

/**
  * 生成vue rollup配置对象
  * @param {Object} obj 参数对象
  * @returns 一个rollup配置对象
  */
export const genVueConf = ({ format, file, isModern, external, globals, INPUT_FILE, PACKAGE_ROOT_PATH, LERNA_PACKAGE_NAME }) => ({
  input: INPUT_FILE,

  output: {
    file: path.join(PACKAGE_ROOT_PATH, file),
    format,
    sourcemap: false,
    name: transform2PascalCase(LERNA_PACKAGE_NAME),
    globals,
    amd: {
      id: LERNA_PACKAGE_NAME
    },
    exports: 'named'
  },

  external,

  plugins: [
    nodeResolve(),
    commonjs(),
    babel(getBabelOptions(isModern)),
    img({
      output: 'dist', // default the root
      extensions: /\.(png|jpg|jpeg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
      limit: 8192, // default 8192(8k)
      _slash: true // 使用相对路径
      // exclude: 'node_modules/**'
    }),
    vue({
      css: false, // 不内联css，提取css并使用rollup-plugin-css-only处理css；https://rollup-plugin-vue.vuejs.org/migrating.html;弃用rollup-plugin-css-only(不支持压缩)，改用postcss
      compileTemplate: true // 使用把template编译为render函数
    }),
    postcss({
      extract: path.join('index.css'),
      minimize: true
    }),
    banner(getBanner()),
    terser(getTerserOptions())
  ]
})
