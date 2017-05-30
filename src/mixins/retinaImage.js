// @flow
import hiDPI from './hiDPI'
import validateModule from '../validation/_validateModule'

/**
 * A helper to generate a retina background image and non-retina
 * background image. The retina background image will output to a HiDPI media query. The mixin uses
 * a _2x.png fileName suffix by default.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *  ...retinaImage('my-img')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${retinaImage('my-img')}
 * `
 *
 * // CSS as JS Output
 * div {
 *   backgroundImage: 'url(my-img.png)',
 *   '@media only screen and (-webkit-min-device-pixel-ratio: 1.3),
 *    only screen and (min--moz-device-pixel-ratio: 1.3),
 *    only screen and (-o-min-device-pixel-ratio: 1.3/1),
 *    only screen and (min-resolution: 144dpi),
 *    only screen and (min-resolution: 1.5dppx)': {
 *     backgroundImage: 'url(my-img_2x.png)',
 *   }
 * }
 */
function retinaImage(
  fileName: string,
  backgroundSize?: string,
  extension?: string = 'png',
  retinaFileName?: string,
  retinaSuffix?: string = '_2x',
) {
  // Replace the dot at the beginning of the passed extension if one exists
  const ext = extension.replace(/^\./, '')
  const rFileName = retinaFileName
    ? `${retinaFileName}.${ext}`
    : `${fileName}${retinaSuffix}.${ext}`

  return {
    backgroundImage: `url(${fileName}.${ext})`,
    [hiDPI()]: {
      backgroundImage: `url(${rFileName})`,
      backgroundSize,
    },
  }
}

export default validateModule({
  modulePath: 'mixins/retinaImage',
  arrityCheck: { min: 1, max: 5 },
  typeCheck: [
    {
      type: 'string',
      required: true,
    },
    { type: 'string' },
    { type: 'string' },
    { type: 'string' },
    { type: 'string' },
  ],
})(retinaImage)
