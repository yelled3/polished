// @flow
import arrityCheck from './_arrityCheck'
import customRule from './_customRule'
import deprecationCheck from './_deprecationCheck'
import typeCheck from './_typeCheck'

/**
 * Handles validation of polished modules.
 * @private
 */

function setValidationStatus(currentStatus, newStatus) {
  return !currentStatus ? currentStatus : newStatus
}

function validateModule(modulePath: string, msgConfig?: Object) {
  deprecationCheck(modulePath)
  if (!msgConfig) return true
  let validationStatus = true
  if (msgConfig.arrityCheck) {
    validationStatus = setValidationStatus(
      validationStatus,
      arrityCheck(modulePath, msgConfig.arrityCheck),
    )
  }
  if (msgConfig.typeCheck) {
    validationStatus = setValidationStatus(
      validationStatus,
      typeCheck(modulePath, msgConfig.typeCheck),
    )
  }
  if (msgConfig.customRule) {
    validationStatus = setValidationStatus(
      validationStatus,
      customRule(modulePath, msgConfig.customRules),
    )
  }
  return validationStatus
}

export { arrityCheck, customRule, deprecationCheck, typeCheck }

export default validateModule
