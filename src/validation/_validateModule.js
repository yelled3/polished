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

function validateModule(config: Object, mixin: Function, args) {
  let isValid = true

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    deprecationCheck(config.modulePath)
  }

  if (config.arrityCheck) {
    isValid = setValidationStatus(
      isValid,
      arrityCheck(config.modulePath, config.arrityCheck),
    )
  }
  if (config.typeCheck) {
    isValid = setValidationStatus(
      isValid,
      typeCheck(config.modulePath, config.typeCheck),
    )
  }
  if (config.customRule) {
    isValid = setValidationStatus(
      isValid,
      customRule(config.modulePath, config.customRule),
    )
  }

  const errReturnValue = config.errReturn ? config.errReturn : {}

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'production' && !isValid) {
    console.warn(
      'You have incured 1 or more minified ✨ polished errors. You can use the non-minified dev environment for full errors and additional helpful warnings.',
    )
    return errReturnValue
  }

  return isValid ? mixin(...args) : errReturnValue
}

export { arrityCheck, customRule, deprecationCheck, typeCheck }

export default validateModule
