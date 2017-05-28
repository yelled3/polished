// @flow
import message from './_message'

/**
 * Handles custom validation of polished modules.
 * @private
 */

function customRule(modulePath: string, msgConfig: Object) {
  if (!msgConfig.enforce) {
    message('error', msgConfig.msg, modulePath)
    return false
  }
  return true
}

export default customRule
