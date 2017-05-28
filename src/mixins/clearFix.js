// @flow
import validateModule from '../validation/_validateModule'

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

function clearFix(parent?: string = '&') {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      !validateModule('mixins/clearFix.js', {
        // eslint-disable-next-line prefer-rest-params
        arrityCheck: { args: arguments, max: 1 },
        typeCheck: { param: parent, type: 'string' },
      })
    ) {
      return {}
    }
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
