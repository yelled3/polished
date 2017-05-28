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
    const messageBody = `will be deprecated as of version ${deprecationInfo.version} of ✨ polished. ${deprecationInfo.guidance}`
    message('warning', messageBody, modulePath)
  }
  return true
}

export default deprecationCheck
