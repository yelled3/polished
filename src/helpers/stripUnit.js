// @flow
import polish from '../validation/polish'

/**
 * Strip the unit from a given CSS value, returning just the number.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   '--dimension': stripUnit('100px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   --dimension: ${stripUnit('100px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   '--dimension': 100
 * }
 */

function stripUnit(value: string) {
  const unitlessValue = parseFloat(value)
  if (isNaN(unitlessValue)) return value
  return unitlessValue
}

export default polish({
  modulePath: 'helpers/stripUnit',
  types: {
    type: ['number', 'string'],
    required: true,
  },
  errReturn: '',
})(stripUnit)
