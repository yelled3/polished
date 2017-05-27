// @flow
import messageHandlers from '../internalHelpers/_messageHandlers'

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
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      messageHandlers('mixins/selection.js', {
        // eslint-disable-next-line prefer-rest-params
        arrityCheck: { args: arguments, min: 1, max: 2 },
        typeChecks: [
          { param: styles, type: 'object' },
          { param: parent, type: 'string' },
        ],
      })
    ) {
      return {}
    }
  }

  return {
    [`${parent}::-moz-selection`]: {
      ...styles,
    },
    [`${parent}::selection`]: {
      ...styles,
    },
  }
}

export default selection
