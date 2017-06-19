// @flow
import polish from '../validation/polish'

/** */
type AnimationProperty = string | number

/**
 * Shorthand for easily setting the animation property. Allows either multiple arrays with animations
 * or a single animation spread over the arguments.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...animation(['rotate', '1s', 'ease-in-out'], ['colorchange', '2s'])
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${animation(['rotate', '1s', 'ease-in-out'], ['colorchange', '2s'])}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'animation': 'rotate 1s ease-in-out, colorchange 2s'
 * }
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...animation('rotate', '1s', 'ease-in-out')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${animation('rotate', '1s', 'ease-in-out')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'animation': 'rotate 1s ease-in-out'
 * }
 */
function animation(
  ...args: Array<Array<AnimationProperty> | AnimationProperty>
) {
  const code = args
    .map(arg => (Array.isArray(arg) ? arg.join(' ') : arg))
    .join(', ')

  return {
    animation: code,
  }
}

export default polish({
  modulePath: 'shorthands/animation',
  types: {
    key: 'animationProperty',
    type: ['array', 'number', 'string'],
    maxLength: 8,
    required: true,
    matchAll: true,
  },
})(animation)
