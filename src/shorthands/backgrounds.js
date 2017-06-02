// @flow
import polish from '../validation/polish'

/**
 * Thorthand that accepts any number of background values as parameters for creating a single background statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...backgrounds('url("/image/background.jpg")', 'linear-gradient(red, green)', 'center no-repeat')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${...backgrounds('url("/image/background.jpg")', 'linear-gradient(red, green)', 'center no-repeat')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'background': 'url("/image/background.jpg"), linear-gradient(red, green), center no-repeat'
 * }
 */
function backgrounds(...properties: Array<string>) {
  return {
    background: properties.join(', '),
  }
}

export default polish({
  modulePath: 'shorthands/backgrounds',
  types: { type: 'string', matchAll: true, required: true },
})(backgrounds)
