// @flow
import message from './_message'

/**
 * Handles type validation of polished modules.
 * @private
 */

// Styles
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

function validateArray(type, arg) {
  if (type.min && type.max) {
    return (
      Array.isArray(arg) &&
      arg.length > type.min - 1 &&
      arg.length < type.max - 1
    )
  }
  if (type.min) {
    return Array.isArray(arg) && arg.length > type.min - 1
  }
  if (type.max) {
    return Array.isArray(arg) && arg.length > type.max - 1
  }
  return Array.isArray(arg)
}

function typeCheck(typeInfo, arg) {
  if (Array.isArray(typeInfo.type)) {
    let validationStatus = false
    typeInfo.type.forEach(type => {
      validationStatus =
        validationStatus || typeCheck({ ...typeInfo, type }, arg)
    })
    return validationStatus
  }

  switch (typeInfo.type) {
    case 'array':
      return validateArray(typeInfo, arg)
    case 'object':
      return typeof arg === 'object' && arg !== null
    case 'enumerable':
      if (Array.isArray(typeInfo.map)) {
        return typeInfo.map.indexOf(arg) >= 0
      }
      return typeInfo.map[arg]
    default:
      // eslint-disable-next-line valid-typeof
      return typeof arg === typeInfo.type
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

function generateMessages(modulePath, typeInfo, arg, index) {
  if ((arg || arg) && !typeCheck(typeInfo, arg)) {
    let messageBody
    if (index >= 0) {
      messageBody = `expects a %c${index + 1}${ordinalSuffix(index + 1)} parameter%c(%c${typeInfo.key} %c:%c ${typeInfo.type}%c). However, you passed (%c'${arg}' %c:%c ${typeof arg}%c) instead.`
    } else {
      messageBody = `expects a %cparameter%c(%c${typeInfo.key} %c:%c ${typeInfo.type}%c). However, you passed (%c'${arg}' %c:%c ${typeof arg}%c) instead.`
    }
    message('error', messageBody, modulePath, expectedStyles)
    return false
  }
  if (!arg && arg !== 0 && typeInfo.required) {
    let messageBody
    if (index >= 0) {
      messageBody = `requires a %c${index + 1}${ordinalSuffix(index + 1)} parameter%c(%c${typeInfo.key} %c:%c ${typeInfo.type}%c). However, you did not pass %c${typeInfo.key}%c.`
    } else {
      messageBody = `requires a %cparameter%c(%c${typeInfo.key} %c:%c ${typeInfo.type}%c). However, you did not pass %c${typeInfo.key}%c.`
    }
    message('error', messageBody, modulePath, requiredStyles)
    return false
  }
  return true
}

function validateTypes(
  modulePath: string,
  types: Object | Array<Object>,
  args: Array<any>,
) {
  if (Array.isArray(types)) {
    let returnStatus = true
    types.forEach((type, index) => {
      const newStatus = generateMessages(modulePath, type, args[index], index)
      returnStatus = !returnStatus ? returnStatus : newStatus
    })
  } else if (types.matchAll) {
    let returnStatus = true
    args.forEach((arg, index) => {
      const newStatus = generateMessages(modulePath, types, arg, index)
      returnStatus = !returnStatus ? returnStatus : newStatus
    })
    return returnStatus
  }
  return generateMessages(modulePath, types, args[0])
}

export default validateTypes
