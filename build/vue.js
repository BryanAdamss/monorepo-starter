/**
 * @author GuangHui
 * @description rollup vue配置
 */
import path from 'path'

import { genVueConfig, getAllModules, getFormats } from './utils'

const { LERNA_PACKAGE_NAME, LERNA_ROOT_PATH } = process.env

const PACKAGE_ROOT_PATH = process.cwd()
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'src/index.js')
const OUTPUT_DIR = path.join(PACKAGE_ROOT_PATH, 'dist')
const PKG = require(path.join(PACKAGE_ROOT_PATH, 'package.json'))
const IS_BROWSER_BUNDLE = !!PKG.browser

const ALL_MODULES = getAllModules(LERNA_ROOT_PATH)

const formats = getFormats(IS_BROWSER_BUNDLE)

const genParams = format => ({ format, INPUT_FILE, OUTPUT_DIR, LERNA_PACKAGE_NAME, ALL_MODULES })

export default formats
  .map(genParams)
  .map(genVueConfig)
