// @flow
import validateModule from '../validation/_validateModule'

/**
 * CSS to style the selection psuedo-element.
 *
 * ***Deprecation Warning:*** *This mixin has been deprecated and will be removed in version 3.0.*
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...selection({
 *     'backgroundColor': 'blue'
 *   }, 'section')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${selection({'backgroundColor': 'blue'}, 'section')}
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'section::-moz-selection': {
 *     'backgroundColor':'blue',
 *   },
 *   'section::selection': {
 *     'backgroundColor': 'blue',
 *   }
 * }
 */

function selection(styles: Object, parent: string = '') {
  return {
    [`${parent}::-moz-selection`]: {
      ...styles,
    },
    [`${parent}::selection`]: {
      ...styles,
    },
  }
}

export default (...args) =>
  validateModule(
    {
      modulePath: 'mixins/selection',
      arrityCheck: { args, min: 1, max: 2 },
      typeCheck: [
        { param: args[0], type: 'object' },
        { param: args[1], type: 'string' },
      ],
    },
    selection,
    args,
  )
