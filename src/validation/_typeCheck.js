// @flow
import message from './_message'

/**
 * Handles type validation of polished modules.
 * @private
 */

function validateType(param: any, type: string, map: Object | Array<any>) {
  switch (type) {
    case 'array':
      return Array.isArray(param)
    case 'object':
      return typeof param === 'object' && param !== null
    case 'enumerable':
      if (Array.isArray(map)) return map.includes(param)
      return map[param]
    default:
      // eslint-disable-next-line valid-typeof
      return typeof param === type
  }
}

const ordinal = [
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th',
  '10th',
]

function setReturnStatus(currentStatus, newStatus) {
  return !currentStatus ? currentStatus : newStatus
}

function typeCheck(modulePath: string, msgConfig: Object | Array<Object>) {
  if (Array.isArray(msgConfig)) {
    let returnStatus = true
    msgConfig.forEach((config, index) => {
      if (
        config.param &&
        !validateType(config.param, config.type, config.map)
      ) {
        const messageBody = `expects a ${ordinal[index]} parameter of type ${config.type}. However, you passed ${config.param}(${typeof config.param}) instead.`
        message('error', messageBody, modulePath)
        returnStatus = setReturnStatus(returnStatus, false)
        return
      }
      if (!config.param && config.required) {
        message('error', config.required, modulePath)
        returnStatus = setReturnStatus(returnStatus, false)
        return
      }
      returnStatus = setReturnStatus(returnStatus, true)
    })
    return returnStatus
  } else {
    if (
      msgConfig.param &&
      !validateType(msgConfig.param, msgConfig.type, msgConfig.map)
    ) {
      let messageBody
      if (msgConfig.type === 'enumerable') {
        messageBody = `received an enumerable value(${msgConfig.param}) that was not one of the available options.`
      } else {
        messageBody = `expects a parameter of type ${msgConfig.type}. However, you passed ${msgConfig.param}(${typeof msgConfig.param}) instead.`
      }
      message('error', messageBody, modulePath)
      return false
    }
    if (!msgConfig.param && msgConfig.required) {
      message('error', msgConfig.required, modulePath)
      return false
    }
    return true
  }
}

export default typeCheck
