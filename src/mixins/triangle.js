// @flow
import validateModule from '../validation/_validateModule'

/** */
type PointingDirection = 'top' | 'right' | 'bottom' | 'left'

const getBorderWidth = (
  pointingDirection: PointingDirection,
  height: number,
  width: number,
) => {
  switch (pointingDirection) {
    case 'top':
      return `0 ${width / 2}px ${height}px ${width / 2}px`
    case 'left':
      return `${height / 2}px ${width}px ${height / 2}px 0`
    case 'bottom':
      return `${height}px ${width / 2}px 0 ${width / 2}px`
    case 'right':
    default:
      return `${height / 2}px 0 ${height / 2}px ${width}px`
  }
}

// needed for border-color
const reverseDirection = {
  left: 'Right',
  right: 'Left',
  top: 'Bottom',
  bottom: 'Top',
}

/**
 * CSS to represent triangle with any pointing direction with an optional background color. Accepts number or px values for height and width.
 *
 * @example
 * // Styles as object usage
 *
 * const styles = {
 *   ...triangle({ pointingDirection: 'right', width: '100px', height: '100px', foregroundColor: 'red' })
 * }
 *
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${triangle({ pointingDirection: 'right', width: '100px', height: '100px', foregroundColor: 'red' })}
 *
 *
 * // CSS as JS Output
 *
 * div: {
 *  'borderColor': 'transparent',
 *  'borderLeftColor': 'red !important',
 *  'borderStyle': 'solid',
 *  'borderWidth': '50px 0 50px 100px',
 *  'height': '0',
 *  'width': '0',
 * }
 */
function triangle(
  pointingDirection: PointingDirection,
  height: string,
  width: string,
  foregroundColor: string,
  backgroundColor?: string = 'transparent',
) {
  const unitlessHeight = parseFloat(height)
  const unitlessWidth = parseFloat(width)

  return {
    borderColor: backgroundColor,
    [`border${reverseDirection[pointingDirection]}Color`]: foregroundColor,
    width: '0',
    height: '0',
    borderWidth: getBorderWidth(
      pointingDirection,
      unitlessHeight,
      unitlessWidth,
    ),
    borderStyle: 'solid',
  }
}

export default validateModule({
  modulePath: 'mixins/triangle',
  types: [
    {
      key: 'pointingDirection',
      type: 'string',
      required: true,
    },
    {
      key: 'height',
      type: 'cssMeasure',
      required: true,
    },
    {
      key: 'width',
      type: 'cssMeasure',
      required: true,
    },
    {
      key: 'foregroundColor',
      type: 'string',
      required: true,
    },
    { key: 'backgroundColor', type: 'string' },
  ],
})(triangle)
