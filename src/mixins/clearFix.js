// @flow
import polish from '../validation/polish'

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
  return {
    [`${parent}::after`]: {
      clear: 'both',
      content: '""',
      display: 'table',
    },
  }
}

export default polish({
  modulePath: 'mixins/clearFix',
  types: { type: 'string' },
})(clearFix)
