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
  const unitlessValue = parseFloat(value)
  if (isNaN(unitlessValue)) return value
  return unitlessValue
}

export default (...args) =>
  validateModule(
    {
      modulePath: 'helpers/stripUnit',
      arrityCheck: { args, exactly: 1 },
      typeCheck: { param: args[0], type: 'string' },
      errReturn: '',
    },
    stripUnit,
    args,
  )
