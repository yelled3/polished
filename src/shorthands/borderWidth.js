// @flow
import { directionalProperty } from '../helpers/directionalProperty'
import polish from '../validation/polish'

/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderWidth('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderWidth('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopWidth': '12px',
 *   'borderRightWidth': '24px',
 *   'borderBottomWidth': '36px',
 *   'borderLeftWidth': '48px'
 * }
 */

function borderWidth(...values: Array<?string>) {
  return directionalProperty('borderWidth', ...values)
}

export default polish({
  modulePath: 'shorthands/borderWidth',
  types: [
    { key: 'firstWidth', type: 'cssMeasure' },
    { key: 'secondWidth', type: 'cssMeasure' },
    { key: 'thirdWidth', type: 'cssMeasure' },
    { key: 'fourthWidth', type: 'cssMeasure' },
  ],
})(borderWidth)
