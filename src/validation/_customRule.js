// @flow
import message from './_message'

function customRule(modulePath: string, msgConfig: Object) {
  if (!msgConfig.enforce) {
    message('error', msgConfig.msg, modulePath)
    return false
  }
  return true
}

export default customRule
