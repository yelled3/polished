// @flow
import messageHandlers from '../internalHelpers/_messageHandlers'

type WrapKeywords = 'break-all' | 'normal'

const wrapKeywords = ['break-word', 'normal']

/**
 * Provides an easy way to change the `wordWrap` property.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...wordWrap('break-all')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${wordWrap('break-all')}
 * `
 *
 * // CSS as JS Output
 *
 * const styles = {
 *   overflowWrap: 'break-all',
 *   wordWrap: 'break-all',
 *   wordBreak: 'break-all',
 * }
 */

function wordWrap(wrap?: WrapKeywords | string = 'break-word') {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      messageHandlers('mixins/wordWrap.js', {
        // eslint-disable-next-line prefer-rest-params
        arrityCheck: { args: arguments, max: 1 },
        typeChecks: { param: wrap, type: 'enumerable', map: wrapKeywords },
      })
    ) {
      return {}
    }
  }

  const wordBreak = wrap === 'break-word' ? 'break-all' : wrap
  return {
    overflowWrap: wrap,
    wordWrap: wrap,
    wordBreak,
  }
}

export default wordWrap
