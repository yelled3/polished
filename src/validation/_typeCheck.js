// @flow
import getUnit from '../helpers/getUnit'
import message from './_message'

/**
 * Handles type validation of polished modules.
 * @private
 */

const measureKeywords = [
  'auto',
  'max-content',
  'min-content',
  'fill-available',
  'fit-content',
  'inherit',
  'initial',
  'unset',
]

function setValidationStatus(currentStatus, newStatus) {
  return currentStatus || newStatus
}

function setReturnStatus(currentStatus, newStatus) {
  return !currentStatus ? currentStatus : newStatus
}

function validateArray(config) {
  if (config.min && config.max) {
    return (
      Array.isArray(config.param) &&
      config.param.length > config.min - 1 &&
      config.param.length < config.max - 1
    )
  }
  if (config.min) {
    return Array.isArray(config.param) && config.param.length > config.min - 1
  }
  if (config.max) {
    return Array.isArray(config.param) && config.param.length > config.max - 1
  }
  return Array.isArray(config.param)
}

function validateType(config) {
  if (Array.isArray(config.type)) {
    let validationStatus = false
    config.type.forEach(type => {
      validationStatus = setValidationStatus(
        validationStatus,
        validateType({ ...config, type }),
      )
    })
    return validationStatus
  }

  switch (config.type) {
    case 'array':
      return validateArray(config)
    case 'object':
      return typeof config.param === 'object' && config.param !== null
    case 'enumerable':
      if (Array.isArray(config.map)) { return config.map.indexOf(config.param) >= 0 }
      return config.map[config.param]
    case 'cssMeasure':
      return getUnit(config.param) || measureKeywords.indexOf(config.param) >= 0
    case 'cssLength':
      return getUnit(config.param)
    case '%':
    case 'ch':
    case 'cm':
    case 'em':
    case 'ex':
    case 'ic':
    case 'in':
    case 'mm':
    case 'lh':
    case 'pc':
    case 'pt':
    case 'px':
    case 'rem':
    case 'rlh':
    case 'vh':
    case 'vi':
    case 'vb':
    case 'q':
    case 'vmax':
    case 'vmin':
    case 'vw':
      return config.type === getUnit(config.param)
    default:
      // eslint-disable-next-line valid-typeof
      return typeof config.param === config.type
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

function generateMessages(config, modulePath, args) {
  if (
    (args[0] || args[0] === 0) &&
    !validateType({ ...config, param: args[0] })
  ) {
    let messageBody
    if (config.type === 'enumerable') {
      messageBody = `received an enumerable value(${args[0]}) that was not one of the available options.`
    } else {
      messageBody = `expects a parameter of type ${config.type}. However, you passed ${args[0]}(${typeof args[0]}) instead.`
    }
    message('error', messageBody, modulePath)
    return false
  }
  if (!args[0] && args[0] !== 0 && config.required) {
    message('error', config.required, modulePath)
    return false
  }
  return true
}

function typeCheck(
  modulePath: string,
  msgConfig: Object | Array<Object>,
  args: Array<any>,
) {
  if (Array.isArray(msgConfig)) {
    let returnStatus = true
    msgConfig.forEach((config, i) => {
      if (
        (args[i] || args[i] === 0) &&
        !validateType({ ...config, param: args[i] })
      ) {
        const messageBody = `expects a ${ordinal[i]} parameter of type ${config.type}. However, you passed ${args[i]}(${typeof args[i]}) instead.`
        message('error', messageBody, modulePath)
        returnStatus = setReturnStatus(returnStatus, false)
        return
      }
      if (!args[i] && args[i] !== 0 && config.required) {
        message(
          'error',
          `expects a ${ordinal[i]} parameter of type ${config.type}. However, you did not pass one.`,
          modulePath,
        )
        returnStatus = setReturnStatus(returnStatus, false)
        return
      }
      returnStatus = setReturnStatus(returnStatus, true)
    })
    return returnStatus
  } else {
    return generateMessages(msgConfig, modulePath, args)
  }
}

export default typeCheck
