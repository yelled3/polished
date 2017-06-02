// @flow
import { _directionalProperty } from '../helpers/directionalProperty'
import polish from '../validation/polish'

/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...padding('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${padding('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'paddingTop': '12px',
 *   'paddingRight': '24px',
 *   'paddingBottom': '36px',
 *   'paddingLeft': '48px'
 * }
 */

function padding(...values: Array<?string>) {
  return _directionalProperty('padding', ...values)
}

export default polish({
  modulePath: 'shorthands/padding',
  types: [
    { key: 'firstPadding', type: 'cssMeasure' },
    { key: 'secondPadding', type: 'cssMeasure' },
    { key: 'thirdPadding', type: 'cssMeasure' },
    { key: 'fourthPadding', type: 'cssMeasure' },
  ],
})(padding)
