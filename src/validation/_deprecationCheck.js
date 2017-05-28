// @flow
import deprecated from './_deprecated'
import message from './_message'

/**
 * Handles deprecation validation of polished modules.
 * @private
 */

const baseStyles = 'color: black; font-size: 12px'
const highlightStyles = '; font-weight: bold'

function deprecationCheck(modulePath: string) {
  const deprecationInfo = deprecated[modulePath]
  if (deprecationInfo) {
    const messageBody = `will be deprecated as of %cversion ${deprecationInfo.version}%c of ✨ polished. ${deprecationInfo.guidance}`
    const additionalStyles = [
      `${baseStyles}${highlightStyles}`,
      baseStyles,
      `${baseStyles}${highlightStyles}`,
      baseStyles,
    ]
    message('warning', messageBody, modulePath, additionalStyles)
  }
  return true
}

export default deprecationCheck
