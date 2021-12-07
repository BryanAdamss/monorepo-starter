/**
 * @author GuangHui
 * @description 解析配置
 */

/**
 * 解析config文件，得到配置对象名、方法调用名
 *
 * @date 2021-08-11 21:48:06
 * @param {String} cont 待解析内容
 * @return {Array} 类似[[CONFIG_OBJ_NAME, INVOKE_NAME]]的元组
 */
function parseConfig(cont) {
  // 匹配export语句
  const exportReg = /(?<=export\s*?(?:const|let|var)\s*?)(?<CONFIG_OBJ_NAME>[\w-_]+)\s*=.*?{.*?name.*?(?<QUOTE>['"])(?<INVOKE_NAME>[\w-_]+)(?:\k<QUOTE>).*?}/gs

  // 获取配置对象名、请求调用名
  const namesTuple = []
  let result = exportReg.exec(cont)
  while (result) {
    const { CONFIG_OBJ_NAME, INVOKE_NAME } = result.groups

    CONFIG_OBJ_NAME && INVOKE_NAME && namesTuple.push([CONFIG_OBJ_NAME, INVOKE_NAME])

    result = exportReg.exec(cont)
  }
  exportReg.lastIndex = 0

  return namesTuple
}

module.exports = { parseConfig }
