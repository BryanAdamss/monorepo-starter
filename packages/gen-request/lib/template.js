/**
 * @author GuangHui
 * @description 模板
 */

module.exports = `/**
* @author GuangHui
* 当前页面通过@hw/gen-request自动生成，请勿手动修改
* 若需新增接口，请修改{{filePath}}配置文件
*/

{{configImportStatement}}
{{requestImportStatement}}

{{exportStatement}}
`
