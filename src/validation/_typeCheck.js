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

const requiredStyles = [
  'color: black; font-size: 12px; font-weight: bold',
  'color: black; font-size: 12px',
  'color: green; font-size: 12px; font-weight: bold',
  'color: black; font-size: 12px',
  'color: green; font-size: 12px; font-style: italic',
  'color: black; font-size: 12px',
  'color: red; font-size: 12px; font-weight: bold',
  'color: black; font-size: 12px',
]

const expectedStyles = [
  ...requiredStyles,
  'color: red; font-size: 12px; font-style: italic',
  'color: black; font-size: 12px',
]

function setReturnStatus(currentStatus, newStatus) {
  return !currentStatus ? currentStatus : newStatus
}

function setValidationStatus(currentStatus, newStatus) {
  return currentStatus || newStatus
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

function validateTypes(config) {
  if (Array.isArray(config.type)) {
    let validationStatus = false
    config.type.forEach(type => {
      validationStatus = setValidationStatus(
        validationStatus,
        validateTypes({ ...config, type }),
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
      if (Array.isArray(config.map)) {
        return config.map.indexOf(config.param) >= 0
      }
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

function ordinalSuffix(index) {
  switch (index) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

function generateMessages(modulePath, type, arg, index) {
  if ((arg || arg) && !validateTypes({ ...type, param: arg })) {
    let messageBody
    if (index >= 0) {
      messageBody = `expects a %c${index + 1}${ordinalSuffix(index + 1)} parameter%c(%c${type.key}%c: %c${type.type}%c). However, you passed (%c'${arg}'%c:%c${typeof arg}%c) instead.`
    } else {
      messageBody = `expects a %cparameter%c(%c${type.key}%c: %c${type.type}%c). However, you passed (%c'${arg}'%c:%c${typeof arg}%c) instead.`
    }
    message('error', messageBody, modulePath, expectedStyles)
    return false
  }
  if (!arg && arg !== 0 && type.required) {
    let messageBody
    if (index >= 0) {
      messageBody = `requires a %c${index + 1}${ordinalSuffix(index + 1)} parameter%c(%c${type.key}%c: %c${type.type}%c). However, you did not pass %c${type.key}%c.`
    } else {
      messageBody = `requires a %cparameter%c(%c${type.key}%c: %c${type.type}%c). However, you did not pass %c${type.key}%c.`
    }
    message('error', messageBody, modulePath, requiredStyles)
    return false
  }
  return true
}

function typeCheck(
  modulePath: string,
  types: Object | Array<Object>,
  args: Array<any>,
) {
  if (Array.isArray(types)) {
    let returnStatus = true
    types.forEach((type, index) => {
      returnStatus = setReturnStatus(
        returnStatus,
        generateMessages(modulePath, type, args[index], index),
      )
    })
    return returnStatus
  } else {
    return generateMessages(modulePath, types, args[0])
  }
}

export default typeCheck
