// @flow
import parseToHsl from './parseToHsl'
import toColorString from './toColorString'
import guard from '../internalHelpers/_guard'
import curry from '../internalHelpers/_curry'
import deprecationCheck from '../validation/_deprecationCheck'

/**
 * Decreases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the desaturate function is the amount by how much the color
 * intensity should be decreased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: desaturate(0.2, '#CCCD64'),
 *   background: desaturate(0.2, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${desaturate(0.2, '#CCCD64')};
 *   background: ${desaturate(0.2, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#b8b979";
 *   background: "rgba(184,185,121,0.7)";
 * }
 */
function desaturate(amount: number, color: string): string {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    const modulePath = 'color/desaturate.js'
    deprecationCheck(modulePath)
  }

  const hslColor = parseToHsl(color)
  return toColorString({
    ...hslColor,
    saturation: guard(0, 1, hslColor.saturation - amount),
  })
}

export default curry(desaturate)
