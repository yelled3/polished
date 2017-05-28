// @flow
import message from './_message'

/**
 * Handles arrity validation of polished modules.
 * @private
 */

function arrityCheck(modulePath: string, msgConfig: Object) {
  if (msgConfig.exactly && msgConfig.args.length !== msgConfig.exactly) {
    if (msgConfig.args.length > msgConfig.exactly) {
      const messageBody = `expects ${msgConfig.exactly} ${msgConfig.exactly === 1 ? 'parameter' : 'parameters'}. However, you passed ${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}. These additional parameters were ignored.`
      message('warning', messageBody, modulePath)
    } else {
      const messageBody = `expects ${msgConfig.exactly} ${msgConfig.exactly === 1 ? 'parameter' : 'parameters'}. However, you only passed ${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}. Please provide ${msgConfig.exactly - msgConfig.args.length} additional ${msgConfig.exactly - msgConfig.args.length === 1 ? 'parameter' : 'parameters'}.`
      message('error', messageBody, modulePath)
      return false
    }
  }

  if (msgConfig.min && msgConfig.args.length < msgConfig.min) {
    const messageBody = `expects a minimum of ${msgConfig.min} ${msgConfig.min === 1 ? 'parameter' : 'parameters'}. However, you only passed ${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}.`
    message('error', messageBody, modulePath)
    return false
  }

  if (
    (msgConfig.max || msgConfig.max === 0) &&
    msgConfig.args.length > msgConfig.max
  ) {
    const messageBody = `expects a maximum of ${msgConfig.max} ${msgConfig.max === 1 ? 'parameter' : 'parameters'}. However, you passed ${msgConfig.args.length} ${msgConfig.args.length === 1 ? 'parameter' : 'parameters'}. ${msgConfig.args.length === 1 ? 'This additional parameter was' : 'These additional parameters were'} ignored.`
    message('warning', messageBody, modulePath)
  }
  return true
}

export default arrityCheck
