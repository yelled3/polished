// @flow
import messageHandlers, {
  typeChecks,
} from '../internalHelpers/_messageHandlers'

/** */
type PointingDirection = 'top' | 'right' | 'bottom' | 'left'

type TriangleArgs = {
  backgroundColor?: string,
  foregroundColor: string,
  height: string,
  width: string,
  pointingDirection: PointingDirection,
}

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

function triangle(config: TriangleArgs) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      messageHandlers('mixins/triangle.js', {
        // eslint-disable-next-line prefer-rest-params
        arrityCheck: { args: arguments, exactly: 1, throw: true },
        typeChecks: {
          param: config,
          type: 'object',
          throw: true,
          required: 'requires a config object as its only parameter. However, you did not provide one.',
        },
      })
    ) {
      return {}
    }
  }

  const {
    pointingDirection,
    height,
    width,
    foregroundColor,
    backgroundColor = 'transparent',
  } = config

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      !typeChecks('mixins/triangle.js', [
        // TODO: Needs to be a proper enumberable
        {
          param: pointingDirection,
          type: 'string',
          required: 'expects a value(string) for pointingDirection. However, you did not provide one.',
        },
        {
          param: height,
          type: 'string',
          required: 'expects a value(string) for height. However, you did not provide one.',
        },
        {
          param: width,
          type: 'string',
          required: 'expects a value(string) for width. However, you did not provide one.',
        },
        {
          param: foregroundColor,
          type: 'string',
          required: 'expects a value(string) for foregroundColor. However, you did not provide one.',
        },
        { param: backgroundColor, type: 'string' },
      ])
    ) {
      return {}
    }
  }

  const unitlessHeight = parseFloat(height)
  const unitlessWidth = parseFloat(width)

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      !typeChecks('mixins/triangle.js', [
        {
          param: unitlessHeight,
          type: 'number',
          required: 'requires a pixel based value for height.',
          throw: true,
        },
        {
          param: unitlessWidth,
          type: 'number',
          required: 'requires a pixel based value for width.',
          throw: true,
        },
      ])
    ) {
      return {}
    }
  }

  return {
    borderColor: backgroundColor,
    width: '0',
    height: '0',
    borderWidth: getBorderWidth(
      pointingDirection,
      unitlessHeight,
      unitlessWidth,
    ),
    borderStyle: 'solid',
    /*
    * javascript Object sorting orders 'border-color' after 'border-bottom-color'
    * (bottom-b) is before (bottom-c) - !important is needed
    * { border-bottom-color: 'red', border-color: 'transparent' }
    */
    [`border${reverseDirection[pointingDirection]}Color`]: `${foregroundColor} !important`,
  }
}

export default triangle
