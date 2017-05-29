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
  return {
    [`${parent}::after`]: {
      clear: 'both',
      content: '""',
      display: 'table',
    },
  }
}

export default (...args) =>
  validateModule(
    {
      modulePath: 'mixins/clearFix',
      arrityCheck: { args, max: 1 },
      typeCheck: { param: args[0], type: 'string' },
    },
    clearFix,
    args,
  )
