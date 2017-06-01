// @flow
import polish from '../validation/polish'

type WrapKeywords = 'break-all' | 'break-word' | 'normal'

const wrapKeywords = ['break-word', 'normal']

/**
 * Provides an easy way to change the `wordWrap` property.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...wordWrap('break-word')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${wordWrap('break-word')}
 * `
 *
 * // CSS as JS Output
 *
 * const styles = {
 *   overflowWrap: 'break-word',
 *   wordWrap: 'break-word',
 *   wordBreak: 'break-all',
 * }
 */

function wordWrap(wrap?: WrapKeywords | string = 'break-word') {
  const wordBreak = wrap === 'break-word' ? 'break-all' : wrap
  return {
    overflowWrap: wrap,
    wordWrap: wrap,
    wordBreak,
  }
}

export default polish({
  modulePath: 'mixins/wordWrap',
  types: { type: 'enumerable', map: wrapKeywords },
})(wordWrap)
