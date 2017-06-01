// @flow
import capitalizeString from '../internalHelpers/_capitalizeString'
import polish from '../validation/polish'

/**
 * A shorthand that accepts a value for side and a value for radius and applies the radius value to both corners of the side.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderRadius('top', '5px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderRadius('top', '5px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopRightRadius': '5px',
 *   'borderTopLeftRadius': '5px',
 * }
 */

function borderRadius(side: string, radius: string) {
  const uppercaseSide = capitalizeString(side)
  if (uppercaseSide === 'Top' || uppercaseSide === 'Bottom') {
    return {
      [`border${uppercaseSide}RightRadius`]: radius,
      [`border${uppercaseSide}LeftRadius`]: radius,
    }
  }

  if (uppercaseSide === 'Left' || uppercaseSide === 'Right') {
    return {
      [`borderTop${uppercaseSide}Radius`]: radius,
      [`borderBottom${uppercaseSide}Radius`]: radius,
    }
  }
  return {}
}

export default polish({
  modulePath: 'shorthands/borderRadius',
  types: [
    { key: 'side', type: 'cssDirection', required: true },
    { key: 'radius', type: 'cssMeasure', required: true },
  ],
})(borderRadius)
