// @flow
import deprecated from './_deprecated'

function formatMessage(
  type: string,
  messageBody: string,
  moduleName: string,
  modulePath: string,
) {
  const header = `%c ✨ ${type.toUpperCase()} ✨ ---- ${modulePath} --`

  const body = `%c

${moduleName} %c${messageBody}
  `

  const info = `%c
Please see the documentation at %chttps://polished.js.org/docs/#${moduleName}%c for more information.`

  return `${header}${body}${info}`
}

function message(type: string, messageBody: string, modulePath: string) {
  const moduleNameMatch = modulePath.match(/([^/]+)(?=\.\w+$)/)
  const moduleName = moduleNameMatch ? moduleNameMatch[0] : ''
  const formattedMessage = formatMessage(
    type,
    messageBody,
    moduleName,
    modulePath,
  )
  const headerStyles = 'font-weight: bold; color: black'
  const messageStyles = [
    'color: black; font-size: 12px; font-weight: bold',
    'color: black; font-size: 12px',
    'color: gray; line-height: 1.4',
    'color: blue; line-height: 1.4',
    'color: gray; line-height: 1.4',
  ]

  if (type === 'error') {
    // eslint-disable-next-line no-console
    console.error(formattedMessage, headerStyles, ...messageStyles)
  } else {
    // eslint-disable-next-line no-console
    console.warn(formattedMessage, headerStyles, ...messageStyles)
  }
}

export function arrityCheck(modulePath: string, msgConfig: Object) {
  if (msgConfig.exactly && msgConfig.args.length !== msgConfig.exactly) {
    if (msgConfig.args.length > msgConfig.exactly) {
      const messageBody = `expects ${msgConfig.exactly} ${msgConfig.exactly === 1 ? 'parameter' : 'parameters'}. However, you passed ${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}. These additional parameters were ignored.`
      message('warning', messageBody, modulePath, 110)
    } else {
      const messageBody = `expects ${msgConfig.exactly} ${msgConfig.exactly === 1 ? 'parameter' : 'parameters'}. However, you only passed ${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}. Please provide ${msgConfig.exactly - msgConfig.args.length} additional ${msgConfig.exactly - msgConfig.args.length === 1 ? 'parameter' : 'parameters'}.`
      message('error', messageBody, modulePath, 210)
      return false
    }
  }

  if (msgConfig.min && msgConfig.args.length < msgConfig.min) {
    const messageBody = `expects a minimum of ${msgConfig.min} ${msgConfig.min === 1 ? 'parameter' : 'parameters'}. However, you only passed ${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}.`
    message('error', messageBody, modulePath, 211)
    return false
  }

  if (
    (msgConfig.max || msgConfig.max === 0) &&
    msgConfig.args.length > msgConfig.max
  ) {
    const messageBody = `expects a maximum of ${msgConfig.max} ${msgConfig.max === 1 ? 'parameter' : 'parameters'}. However, you passed ${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}. ${msgConfig.args.length === 1 ? 'This additional parameter was' : 'These additional parameters were'} ignored.`
    message('warning', messageBody, modulePath, 111)
  }
  return true
}

export function customRules(modulePath: string, msgConfig: Object) {
  if (!msgConfig.enforce) {
    message('error', msgConfig.msg, modulePath)
    return false
  }
  return true
}

export function deprecatedCheck(modulePath: string) {
  const deprecationInfo = deprecated[modulePath]
  if (deprecationInfo) {
    const messageBody = `will be deprecated as of version ${deprecationInfo.version} of ✨ polished. ${deprecationInfo.guidance}`
    message('warning', messageBody, modulePath)
  }
  return true
}

function checkType(param: any, type: string, map: Object | Array<any>) {
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

export function typeChecks(
  modulePath: string,
  msgConfig: Object | Array<Object>,
) {
  if (Array.isArray(msgConfig)) {
    let returnStatus = true
    msgConfig.forEach((config, index) => {
      if (config.param && !checkType(config.param, config.type, config.map)) {
        const messageBody = `expects a ${ordinal[index]} parameter of type ${config.type}. However, you passed ${config.param}(${typeof config.param}) instead.`
        message('error', messageBody, modulePath, 220)
        returnStatus = setReturnStatus(returnStatus, false)
        return
      }
      if (!config.param && config.required) {
        message('error', config.required, modulePath, 221)
        returnStatus = setReturnStatus(returnStatus, false)
        return
      }
      returnStatus = setReturnStatus(returnStatus, true)
    })
    return returnStatus
  } else {
    if (
      msgConfig.param &&
      !checkType(msgConfig.param, msgConfig.type, msgConfig.map)
    ) {
      let messageBody
      if (msgConfig.type === 'enumerable') {
        messageBody = `received an enumerable value(${msgConfig.param}) that was not one of the available options.`
      } else {
        messageBody = `expects a parameter of type ${msgConfig.type}. However, you passed ${msgConfig.param}(${typeof msgConfig.param}) instead.`
      }
      message('error', messageBody, modulePath, 220)
      return false
    }
    if (!msgConfig.param && msgConfig.required) {
      message('error', msgConfig.required, modulePath, 221)
      return false
    }
    return true
  }
}

/**
 * Handles the formatting of errors and warnings generated by modules.
 * @private
 */

function messageHandlers(modulePath: string, msgConfig?: Object) {
  let messageStatus
  deprecatedCheck(modulePath)
  if (msgConfig && msgConfig.arrityCheck) {
    messageStatus = arrityCheck(modulePath, msgConfig.arrityCheck)
  }
  if (msgConfig && msgConfig.typeChecks) {
    messageStatus = typeChecks(modulePath, msgConfig.typeChecks)
  }
  if (msgConfig && msgConfig.customRules) {
    messageStatus = customRules(modulePath, msgConfig.customRules)
  }
  return !messageStatus
}

export default messageHandlers
