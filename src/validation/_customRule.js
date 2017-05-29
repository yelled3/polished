// @flow
import message from './_message'

/**
 * Handles custom validation of polished modules.
 * @private
 */

function isEnforceable(modulePath, validation) {
  if (!validation.enforce) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      message('error', validation.msg, modulePath)
    }
    return false
  }
  return true
}

function setValidationStatus(currentStatus, newStatus) {
  return !currentStatus ? currentStatus : newStatus
}

function customValidation(modulePath: string, validations: Object) {
  if (Array.isArray(validations)) {
    let validationStatus = true
    validations.forEach(validation => {
      validationStatus = setValidationStatus(
        validationStatus,
        isEnforceable(modulePath, validation),
      )
    })
    return validationStatus
  } else {
    return isEnforceable(modulePath, validations)
  }
}

export default customValidation
