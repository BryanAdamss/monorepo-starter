/**
 * @author GuangHui
 * @description rollup comp(vue)配置
 */

import path from 'path'

import { genGlobals, genVueConf, getAllModules, getFormats } from './utils'

const { LERNA_PACKAGE_NAME, LERNA_ROOT_PATH } = process.env

const PACKAGE_ROOT_PATH = process.cwd()
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'src/index.js')
const PKG = require(path.join(PACKAGE_ROOT_PATH, 'package.json'))

const globals = genGlobals(getAllModules(LERNA_ROOT_PATH))

const external = [
  ...Object.keys(PKG.dependencies || {}),
  ...Object.keys(PKG.peerDependencies || {})
]

const genParams = format => ({ ...format, external, globals, INPUT_FILE, PACKAGE_ROOT_PATH, LERNA_PACKAGE_NAME })

export default getFormats(PKG)
  .map(genParams)
  .map(genVueConf)
