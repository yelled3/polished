// @flow
import deprecated from './_deprecated'
import message from './_message'

/**
 * Handles deprecation validation of polished modules.
 * @private
 */

function deprecationCheck(modulePath: string) {
  const deprecationInfo = deprecated[modulePath]
  if (deprecationInfo) {
    const messageBody = `will be deprecated as of %cversion ${deprecationInfo.version}%c of ✨ polished. ${deprecationInfo.guidance}`
    const additionalStyles = [
      'color: black; font-size: 12px; font-weight: bold;',
      'color: black; font-size: 12px',
      'color: black; font-size: 12px; font-weight: bold;',
      'color: black; font-size: 12px',
    ]
    message('warning', messageBody, modulePath, additionalStyles)
  }
  return true
}

export default deprecationCheck
