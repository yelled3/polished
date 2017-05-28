// @flow
import validateModule from '../validation/_validateModule'

/**
 * Generates a media query to target HiDPI devices.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *  [hiDPI(1.5)]: {
 *    width: 200px;
 *  }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${hiDPI(1.5)} {
 *     width: 200px;
 *   }
 * `
 *
 * // CSS as JS Output
 *
 * '@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
 *  only screen and (min--moz-device-pixel-ratio: 1.5),
 *  only screen and (-o-min-device-pixel-ratio: 1.5/1),
 *  only screen and (min-resolution: 144dpi),
 *  only screen and (min-resolution: 1.5dppx)': {
 *   'width': '200px',
 * }
 */

function hiDPI(ratio?: number = 1.3) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      !validateModule('mixins/hiDPI.js', {
        // eslint-disable-next-line prefer-rest-params
        arrityCheck: { args: arguments, max: 1 },
        typeCheck: { param: ratio, type: 'number' },
      })
    ) {
      return ''
    }
  }

  return `
    @media only screen and (-webkit-min-device-pixel-ratio: ${ratio}),
    only screen and (min--moz-device-pixel-ratio: ${ratio}),
    only screen and (-o-min-device-pixel-ratio: ${ratio}/1),
    only screen and (min-resolution: ${Math.round(ratio * 96)}dpi),
    only screen and (min-resolution: ${ratio}dppx)
  `
}

export default hiDPI
