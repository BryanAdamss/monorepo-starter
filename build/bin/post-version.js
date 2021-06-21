/**
 * @author GuangHui
 * @description lerna version钩子后执行的逻辑
 */

const { log } = require('../shared/tool')
const { updateVersions } = require('../shared/update-comp')
const { updateRootMd, updateIntroMdx } = require('../shared/update-info')

updateVersions()

updateRootMd()

updateIntroMdx()

log('exec postversion hook DONE!')
