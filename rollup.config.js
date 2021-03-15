import path from 'path'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import banner from 'rollup-plugin-banner'
import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import { getPackagesSync } from '@lerna/project'

const { LERNA_PACKAGE_NAME, LERNA_ROOT_PATH } = process.env

const PACKAGE_ROOT_PATH = process.cwd()
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'src/index.js')
const OUTPUT_DIR = path.join(PACKAGE_ROOT_PATH, 'dist')
const PKG = require(path.join(PACKAGE_ROOT_PATH, 'package.json'))
const IS_BROWSER_BUNDLE = !!PKG.browser

const ALL_MODULES = getPackagesSync(LERNA_ROOT_PATH).map((pkg) => pkg.name)

const mirror = (array) =>
  array.reduce((acc, val) => ({ ...acc, [val]: val }), {})

// 浏览器bundle格式
const formats = IS_BROWSER_BUNDLE ? ['es', 'umd'] : ['es', 'cjs']

export default formats.map((format) => ({
  input: INPUT_FILE,

  output: {
    file: path.join(OUTPUT_DIR, `index.${format}.js`),
    format,
    sourcemap: false,
    name: LERNA_PACKAGE_NAME,
    globals: mirror(ALL_MODULES),
    amd: {
      id: LERNA_PACKAGE_NAME,
    },
  },

  external: ALL_MODULES,

  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: ['node_modules/**'],
      presets: [['@babel/preset-env', { modules: false }]],
    }),
    vue(),
    banner(
      'banner\n<%= pkg.name %>\nv<%= pkg.version %>\nby <%= pkg.author %>\nLicense:<%= pkg.license %>\n<%= pkg.homepage%>'
    ),
    terser({
      output: {
        comments(node, { value, type }) {
          return type === 'comment2' ? /banner/i.test(value) : false
        },
      },
    }),
  ],
}))
