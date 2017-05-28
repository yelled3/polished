// @flow
import parseToHsl from './parseToHsl'
import toColorString from './toColorString'
import deprecationCheck from '../validation/_deprecationCheck'

/**
 * Returns the complement of the provided color. This is identical to adjustHue(180, <color>).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: complement('#448'),
 *   background: complement('rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${complement('#448')};
 *   background: ${complement('rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#884";
 *   background: "rgba(153,153,153,0.7)";
 * }
 */
function complement(color: string): string {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    const modulePath = 'color/complement.js'
    deprecationCheck(modulePath)
  }

  const hslColor = parseToHsl(color)
  return toColorString({
    ...hslColor,
    hue: (hslColor.hue + 180) % 360,
  })
}

export default complement
