// @flow
import { _directionalProperty } from '../helpers/directionalProperty'
import polish from '../validation/polish'

/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...margin('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${margin('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'marginTop': '12px',
 *   'marginRight': '24px',
 *   'marginBottom': '36px',
 *   'marginLeft': '48px'
 * }
 */

function margin(...values: Array<?string>) {
  return _directionalProperty('margin', ...values)
}

export default polish({
  modulePath: 'shorthands/margin',
  types: { type: ['string', 'number'], required: true, matchAll: true },
})(margin)
