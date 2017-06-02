// @flow
import { _directionalProperty } from '../helpers/directionalProperty'
import polish from '../validation/polish'

/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderColor('red', 'green', 'blue', 'yellow')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderColor('red', 'green', 'blue', 'yellow')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopColor': 'red',
 *   'borderRightColor': 'green',
 *   'borderBottomColor': 'blue',
 *   'borderLeftColor': 'yellow'
 * }
 */

function borderColor(...values: Array<?string>) {
  return _directionalProperty('borderColor', ...values)
}

// TODO: Proper Color Type
export default polish({
  modulePath: 'shorthands/borderColor',
  types: [
    { key: 'firstColor', type: 'string' },
    { key: 'secondColor', type: 'string' },
    { key: 'thirdColor', type: 'string' },
    { key: 'fourthColor', type: 'string' },
  ],
})(borderColor)
