// @flow
import validateModule from '../validation/_validateModule'

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
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      !validateModule('helpers/stripUnit.js', {
        // eslint-disable-next-line prefer-rest-params
        arrityCheck: { args: arguments, exactly: 1 },
        typeCheck: { param: value, type: 'string' },
      })
    ) {
      return ''
    }
  }

  const unitlessValue = parseFloat(value)
  if (isNaN(unitlessValue)) return value
  return unitlessValue
}

export default stripUnit
