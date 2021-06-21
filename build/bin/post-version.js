/**
 * @author GuangHui
 * @description lerna version钩子后执行的逻辑
 */

const { updateVersions } = require('../shared/update-comp')
const { updateRootMd, updateIntroMdx } = require('../shared/update-info')

updateVersions()

updateRootMd()

updateIntroMdx()
