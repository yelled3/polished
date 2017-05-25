// @flow
import { deprecatedCheck } from '../internalHelpers/_messageHandlers'

/**
 * CSS to contain a float (credit to CSSMojo).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *    ...clearFix(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${clearFix()}
 * `
 *
 * // CSS as JS Output
 *
 * '&::after': {
 *   'clear': 'both',
 *   'content': '""',
 *   'display': 'table'
 * }
 */

function clearFix(parent: string = '&') {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    const modulePath = 'mixins/clearFix.js'
    deprecatedCheck(modulePath)
    // arrityCheck(arguments, 1)
    // typeCheck(parent, string)
    // if (typeof parent !== 'string') error(`expects a \`parent\` parameter of type string. However, you passed \`${parent}\`(${typeof parent}) instead.`)
    // if (arguments.length > 1) warning(`expects a maximum of \`1\` parameter. However, you passed \`${arguments.length}\`. Additional parameters were ignored.`)
    // deprecated('will be deprecated as of version X.0 of polished. You should use the messageHandler property directly instead.')
  }

  const pseudoSelector = `${parent}::after`
  return {
    [pseudoSelector]: {
      clear: 'both',
      content: '""',
      display: 'table',
    },
  }
}

export default clearFix
