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
 *   ...placeholder({'color': 'blue'})
 * }
 *
 * // styled-components usage
 * const div = styled.input`
 *    ${placeholder({'color': 'blue'})}
 * `
 *
 * // CSS as JS Output
 *
 * 'input': {
 *   '&:-moz-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&:-ms-input-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&::-moz-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&::-webkit-input-placeholder': {
 *     'color': 'blue',
 *   },
 * },
 */
function placeholder(styles: Object, parent?: string = '&') {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      messageHandlers('mixins/placeholder.js', {
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
    [`${parent}::-webkit-input-placeholder`]: {
      ...styles,
    },
    [`${parent}:-moz-placeholder`]: {
      ...styles,
    },
    [`${parent}::-moz-placeholder`]: {
      ...styles,
    },
    [`${parent}:-ms-input-placeholder`]: {
      ...styles,
    },
  }
}

export default placeholder
