/**
 * @author GuangHui
 * @description lerna version钩子后执行的逻辑
 */

const { updateVersions } = require('../shared/update-comp')

updateVersions()
