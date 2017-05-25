// @flow
import { deprecatedCheck } from '../internalHelpers/_messageHandlers'

/**
 * Shorthand to set the height and width properties in a single statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...size('300px', '250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${size('300px', '250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'height': '300px',
 *   'width': '250px',
 * }
 */

function size(height: string, width: string = height) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    const modulePath = 'shorthands/size.js'
    deprecatedCheck(modulePath)
  }

  return {
    height,
    width,
  }
}

export default size
