// @flow
import message from './_message'

/**
 * Handles arrity validation of polished modules.
 * @private
 */

function arrityCheck(modulePath: string, msgConfig: Object) {
  if (msgConfig.exactly && msgConfig.args.length !== msgConfig.exactly) {
    if (msgConfig.args.length > msgConfig.exactly) {
      const messageBody = `expects %c${msgConfig.exactly} ${msgConfig.exactly === 1 ? 'parameter' : 'parameters'}%c. However, you passed %c${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}%c. ${msgConfig.args.length === 1 ? 'This additional parameter was' : 'These additional parameters were'} ignored.`
      const additionalStyles = [
        'color: black; font-size: 12px; font-weight: bold; color: green',
        'color: black; font-size: 12px',
        'color: black; font-size: 12px; font-weight: bold; color: goldenrod',
        'color: black; font-size: 12px',
      ]
      message('warning', messageBody, modulePath, additionalStyles)
    } else {
      const messageBody = `expects %c${msgConfig.exactly} ${msgConfig.exactly === 1 ? 'parameter' : 'parameters'}%c. However, you passed %c${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}%c.`
      const additionalStyles = [
        'color: black; font-size: 12px; font-weight: bold; color: green',
        'color: black; font-size: 12px',
        'color: black; font-size: 12px; font-weight: bold; color: red',
        'color: black; font-size: 12px',
      ]
      message('error', messageBody, modulePath, additionalStyles)
      return false
    }
  }

  if (msgConfig.min && msgConfig.args.length < msgConfig.min) {
    const messageBody = `expects a minimum of %c${msgConfig.min} ${msgConfig.min === 1 ? 'parameter' : 'parameters'}%c. However, you passed %c${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}%c.`
    const additionalStyles = [
      'color: black; font-size: 12px; font-weight: bold; color: green',
      'color: black; font-size: 12px',
      'color: black; font-size: 12px; font-weight: bold; color: red',
      'color: black; font-size: 12px',
    ]
    message('error', messageBody, modulePath, additionalStyles)
    return false
  }

  if (
    (msgConfig.max || msgConfig.max === 0) &&
    msgConfig.args.length > msgConfig.max
  ) {
    const messageBody = `expects a maximum of %c${msgConfig.max} ${msgConfig.max === 1 ? 'parameter' : 'parameters'}%c. However, you passed %c${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}%c. ${msgConfig.args.length === 1 ? 'This additional parameter was' : 'These additional parameters were'} ignored.`
    const additionalStyles = [
      'color: black; font-size: 12px; font-weight: bold; color: green',
      'color: black; font-size: 12px',
      'color: black; font-size: 12px; font-weight: bold; color: goldenrod',
      'color: black; font-size: 12px',
    ]
    message('warning', messageBody, modulePath, additionalStyles)
  }
  return true
}

export default arrityCheck
