// @flow
import parseToHsl from './parseToHsl'
import toColorString from './toColorString'
import curry from '../internalHelpers/_curry'
import deprecationCheck from '../validation/_deprecationCheck'

/**
 * Sets the hue of a color to the provided value. The hue range can be
 * from 0 and 359.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setHue(42, '#CCCD64'),
 *   background: setHue(244, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setHue(42, '#CCCD64')};
 *   background: ${setHue(244, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#cdae64";
 *   background: "rgba(107,100,205,0.7)";
 * }
 */
function setHue(hue: number, color: string): string {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    const modulePath = 'color/setHue.js'
    deprecationCheck(modulePath)
  }

  return toColorString({
    ...parseToHsl(color),
    hue,
  })
}

export default curry(setHue)
