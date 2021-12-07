/**
 * @author GuangHui
 * @description description
 */

const fs = require('fs')
const path = require('path')
const globby = require('globby')
const chokidar = require('chokidar')
const fileSave = require('file-save')
const rimraf = require('rimraf')

const { genOutput } = require('./output.js')
const { parseConfig } = require('./parse.js')
const { log, err, succ, info, warn, normalizePath } = require('@hw/node-utils')

class GenRequest {
  constructor({
    invokeNameMap = new Map(),
    invokeNameSet = new Set()
  } = {}) {
    // invokeNameSet结构如下
    // [invokeName1,invokeName2]
    this.invokeNameSet = invokeNameSet

    // invokeNameMap结构如下
    // {
    //   [invokeName1]: filePath,
    //   [invokeName2]: filePath,
    //   [filePath]: [invokeName1, invokeName2]
    // }
    this.invokeNameMap = invokeNameMap

    this.defaultGlobbyOptions = {
      ignore: ['**/node_modules/**']
    }
  }

  /**
   * 提供一个patterns，读取多个配置对象文件，批量生成request文件
   *
   * @date 2021-08-16 15:59:45
   * @public
   * @instance
   * @example
   {
    patterns = ['src/services/api/*.js'], // 默认搜索src/services/api/*.js
    globbyOptions = {}, // 自定义globby的选项，会覆盖默认的选项
    requestFnName = 'apiBuilderInstance.create', // 请求方法名
    requestImportStatement = 'import { apiBuilderInstance } from \'Services/extends/api-builder-instance.js\'', // 请求方法导入语句
    outputDir = 'src/services/request', // 输出文件目录
    debug = false // 调试模式开关，为true输出相关log且不会写文件
   }
   * @memberof GenRequest
   */
  batchGenerate({
    patterns = ['src/services/api/*.js'], // 默认搜索src/services/api/*.js
    globbyOptions = {}, // 自定义globby的选项，会覆盖默认的选项
    requestFnName = 'apiBuilderInstance.create', // 请求方法名
    requestImportStatement = 'import { apiBuilderInstance } from \'Services/extends/api-builder-instance.js\'', // 请求方法导入语句
    outputDir = 'src/services/request', // 输出文件目录
    debug = false // 调试模式开关，为true输出相关log且不会写文件
  } = {}) {
    const options = Object.assign({}, this.defaultGlobbyOptions, globbyOptions)

    const apiConfigFiles = globby.sync(patterns, options)

    debug && log('apiConfigFiles', apiConfigFiles)

    for (
      let i = 0, filePath = null;
      i < apiConfigFiles.length;
      i++
    ) {
      try {
        filePath = apiConfigFiles[i]

        // 生成
        this.generate({
          filePath,
          debug,
          requestFnName,
          requestImportStatement,
          outputDir
        })
      } catch (error) {
        err(error)
        continue
      }
    }
  }

  /**
   * 提供一个文件路径，解析并自动生成请求文件
   *
   * @date 2021-08-16 16:01:42
   * @public
   * @instance
   * @example
   {
    filePath, // 文件路径
    debug, // 调试模式
    requestFnName, // 请求方法名
    requestImportStatement, // 请求方法导入语句
    outputDir// 输出文件目录
   }
   * @memberof GenRequest
   */
  generate({
    filePath, // 文件路径
    debug, // 调试模式
    requestFnName, // 请求方法名
    requestImportStatement, // 请求方法导入语句
    outputDir// 输出文件目录
  }) {
    info(`-----------------------Processing: ${filePath}-----------------------`)

    const namesTuple = this._parseApiConfigFile({ filePath })

    debug && log('namesTuple', namesTuple)

    if (!namesTuple.length) {
      warn('Not detected such `export const requestConfig = { name:\'requestInvokeName\' }` statement!')
      return
    }

    // 由于无法检测到用户在同一个文件新增、删除操作
    // 所以在检测重复前，先删除filePath对应的所有调用名，再查重或新增
    this._delInvokeByFilePath({ filePath, debug })

    // 检查调用名是否重复定义
    namesTuple.forEach(([CONFIG_OBJ_NAME, INVOKE_NAME]) => {
      if (this.invokeNameSet.has(INVOKE_NAME)) {
        warn(
    `The request name [${INVOKE_NAME}] in ${filePath} already defined in ${this.invokeNameMap.get(INVOKE_NAME)}`
        )
      } else {
        this._addInvoke({ invokeName: INVOKE_NAME, filePath, debug })
      }
    })

    const { name: fileName } = path.parse(filePath)

    const output = genOutput({
      filePath,
      fileName,
      namesTuple,
      requestFnName,
      requestImportStatement
    })

    const outputPath = path.join(outputDir, `${fileName}.js`)
    !debug && output && fileSave(outputPath).write(output)
    !debug && output && succ(`Write ${outputPath} success!`)

    info(`-----------------------Process ${filePath} done!-----------------------`)
  }

  /**
   * 监听一个patterns，批量生成请求文件
   *
   * @date 2021-08-16 16:04:36
   * @param {Object} argv 命令行参数
   * @memberof GenRequest
   */
  watch(argv) {
    const watcher = chokidar.watch(argv.patterns, {
      persistent: true,
      // usePolling: true,
      // awaitWriteFinish: {
      // stabilityThreshold: 300
      // },
      // followSymlinks: false,
      atomic: false,
      ignorePermissionErrors: true
    })

    const execGenRequest = changedPath => {
      log(`execGenRequest: ${changedPath} changed`)

      try {
        this.generate({
          filePath: changedPath, // 文件路径
          debug: argv.debug, // 调试模式
          requestFnName: argv.requestFnName, // 请求方法名
          requestImportStatement: argv.requestImportStatement, // 请求方法导入语句
          outputDir: argv.outputDir// 输出文件目录
        })
      } catch (error) {
        err(error)
      }
    }

    const execRemoveRequest = changedPath => {
      log(`execRemoveRequest: ${changedPath} changed`)

      const { name: fileName, ext } = path.parse(changedPath)

      if (!fileName) return

      const filePath = path.join(argv.outputDir, `${fileName}${ext}`)

      if (fs.existsSync(filePath)) {
        log(`${filePath} is ready to delete.`)
        watcher.close().then(() => {
          console.log('closed')
        })
        try {
          fs.chownSync(filePath, 1119623, 1049089)
          fs.rmSync(filePath)
          this._delInvokeByFilePath({
            filePath: changedPath,
            debug: argv.debug
          })
        } catch (error) {
          err(error)
        }
      }

      log(`execRemoveRequest: ${changedPath} done!`)
    }

    watcher
      .on('ready', () => {
        // 启动时，单独执行一次生成逻辑
        if (argv.execOnceOnStart) {
          info('gen-request execOnceOnStart')

          // 启动时，清空outputDir
          argv.autoCleanOutputDirOnStart && rimraf.sync(argv.outputDir)

          this.batchGenerate(argv)
        }

        watcher
          .on('add', execGenRequest)
          .on('change', execGenRequest)

        // 运行时自动清除outputDir中无用的request文件
        // 2021-0817 发现运行时自动清除的功能不够稳定，暂时默认关闭
        if (argv.autoRemove) {
          watcher.on('unlink', execRemoveRequest)

          info('gen-request auto remove outputDir useless request file feature enabled!')
        }

        succ('exec gen-request watch mode SUCCESS!')
      })
  }

  /**
 * 解析配置文件
 *
 * @date 2021-08-13 18:26:23
 * @param {Object} { filePath } 参数对象
 * @return {Tuple}  [配置对象名,调用名]元组
 */
  _parseApiConfigFile({ filePath }) {
    const cont = fs.readFileSync(filePath, 'utf-8')

    // 不包含export内容，直接跳过
    if (!/export/.test(cont)) {
      throw new Error(`${filePath} does not contain export statement!`)
    }

    return parseConfig(cont)
  }

  /**
   * 记录一个调用名（查重用）
   *
   * @date 2021-08-16 19:44:48
   * @param {Object} [{ invokeName, filePath, debug = false }={}] 参数对象
   * @memberof GenRequest
   */
  _addInvoke({ invokeName, filePath, debug = false } = {}) {
    debug && log('_addInvoke args: ', invokeName, filePath)

    if (!invokeName || !filePath) return

    const normalizedPath = normalizePath(filePath)

    this.invokeNameSet.add(invokeName)
    this.invokeNameMap.set(invokeName, normalizedPath)

    !this.invokeNameMap.get(normalizedPath) && this.invokeNameMap.set(normalizedPath, new Set([invokeName]))
    this.invokeNameMap.get(normalizedPath).add(invokeName)
  }

  /**
   * 通过filePath删除
   *
   * @date 2021-08-16 16:32:48
   * @param {String} filePath 配置文件路径
   * @memberof GenRequest
   */

  /**
   * 通过filePath删除
   *
   * @date 2021-08-16 19:38:18
   * @param {Object} { filePath, debug } 配置文件
   * @memberof GenRequest
   */
  _delInvokeByFilePath({ filePath, debug = false } = {}) {
    debug && log('_delInvokeByFilePath args: ', filePath)

    if (!filePath) return

    const normalizedPath = normalizePath(filePath)

    const invokeNames = this.invokeNameMap.get(normalizedPath)

    invokeNames &&
     invokeNames.size &&
      Array.from(invokeNames).forEach(invokeName => {
        this.invokeNameSet.delete(invokeName)
        this.invokeNameMap.delete(invokeName)
      })

    this.invokeNameMap.delete(normalizedPath)
  }
}

module.exports = {
  GenRequest
}
