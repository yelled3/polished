// @flow
import messageHandlers, {
  customRules,
  typeChecks,
} from '../internalHelpers/_messageHandlers'

/** */
type RadialGradientConfiguration = {
  colorStops: Array<string>,
  extent?: string,
  fallback?: string,
  position?: string,
  shape?: string,
}

function parseFallback(colorStops: Array<string>) {
  return colorStops[0].split(' ')[0]
}

function constructGradientValue(
  literals: Array<string>,
  ...substitutions: Array<string>
) {
  let template = ''
  for (let i = 0; i < literals.length; i += 1) {
    template += literals[i]
    // Adds leading coma if properties preceed color-stops
    if (
      i === 3 &&
      substitutions[i] &&
      (substitutions[0] || substitutions[1] || substitutions[2])
    ) {
      template = template.slice(0, -1)
      template += `, ${substitutions[i]}`
      // No trailing space if color-stops is the only param provided
    } else if (
      i === 3 &&
      substitutions[i] &&
      (!substitutions[0] && !substitutions[1] && !substitutions[2])
    ) {
      template += `${substitutions[i]}`
      // Only adds substitution if it is defined
    } else if (substitutions[i]) {
      template += `${substitutions[i]} `
    }
  }
  return template.trim()
}

/**
 * CSS for declaring a radial gradient, including a fallback background-color. The fallback is either the first color-stop or an explicitly passed fallback color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...radialGradient({
 *     colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
 *     extent: 'farthest-corner at 45px 45px',
 *     position: 'center',
 *     shape: 'ellipse',
 *   })
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${radialGradient({
 *     colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
 *     extent: 'farthest-corner at 45px 45px',
 *     position: 'center',
 *     shape: 'ellipse',
 *   })}
 *`
 *
 * // CSS as JS Output
 *
 * div: {
 *   'backgroundColor': '#00FFFF',
 *   'backgroundImage': 'radial-gradient(center ellipse farthest-corner at 45px 45px, #00FFFF 0%, rgba(0, 0, 255, 0) 50%, #0000FF 95%)',
 * }
 */

function radialGradient(config: RadialGradientConfiguration) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      messageHandlers('mixins/radialGradient.js', {
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

  const { colorStops, extent, fallback, position, shape } = config

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      !typeChecks('mixins/radialGradient.js', [
        {
          param: colorStops,
          type: 'array',
          required: 'expects an array of at least 2 color-stops.',
          throw: true,
        },
        { param: extent, type: 'string' },
        { param: fallback, type: 'string' },
        { param: position, type: 'string' },
        { param: shape, type: 'string' },
      ]) ||
      !customRules('mixins/radialGradient.js', {
        enforce: colorStops.length > 1,
        msg: `expects an array of at least 2 color-stops. However, the one you provided only had ${colorStops.length}.`,
      })
    ) {
      return {}
    }
  }

  return {
    backgroundColor: fallback || parseFallback(colorStops),
    backgroundImage: constructGradientValue`radial-gradient(${position}${shape}${extent}${colorStops.join(', ')})`,
  }
}

export default radialGradient
