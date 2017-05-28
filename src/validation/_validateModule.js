// @flow
import arrityCheck from './_arrityCheck'
import customRule from './_customRule'
import deprecationCheck from './_deprecationCheck'
import typeCheck from './_typeCheck'

/**
 * Handles validation of polished modules.
 * @private
 */

function validateModule(modulePath: string, msgConfig?: Object) {
  let messageStatus
  deprecationCheck(modulePath)
  if (!msgConfig) return false
  if (msgConfig.arrityCheck) {
    messageStatus = arrityCheck(modulePath, msgConfig.arrityCheck)
  }
  if (msgConfig.typeCheck) {
    messageStatus = typeCheck(modulePath, msgConfig.typeCheck)
  }
  if (msgConfig.customRule) {
    messageStatus = customRule(modulePath, msgConfig.customRules)
  }
  return messageStatus
}

export { arrityCheck, customRule, deprecationCheck, typeCheck }

export default validateModule
