// @flow
import messageHandlers from '../internalHelpers/_messageHandlers'

/**
 * CSS to represent truncated text with an ellipsis.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...ellipsis('250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${ellipsis('250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   'display': 'inline-block',
 *   'maxWidth': '250px',
 *   'overflow': 'hidden',
 *   'textOverflow': 'ellipsis',
 *   'whiteSpace': 'nowrap',
 *   'wordWrap': 'normal'
 * }
 */

function ellipsis(width?: string = '100%') {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      messageHandlers('mixins/ellipsis.js', {
        // eslint-disable-next-line prefer-rest-params
        arrityCheck: { args: arguments, max: 1 },
        typeChecks: { param: width, type: 'string' },
      })
    ) {
      return {}
    }
  }

  return {
    display: 'inline-block',
    maxWidth: width,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
  }
}

export default ellipsis
