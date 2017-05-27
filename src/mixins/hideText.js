// @flow
import messageHandlers from '../internalHelpers/_messageHandlers'

/**
 * CSS to hide text to show a background image in a SEO-friendly way.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'backgroundImage': 'url(logo.png)',
 *   ...hideText(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   backgroundImage: url(logo.png);
 *   ${hideText()};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'backgroundImage': 'url(logo.png)',
 *   'textIndent': '101%',
 *   'overflow': 'hidden',
 *   'whiteSpace': 'nowrap',
 * }
 */

function hideText() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      messageHandlers('mixins/hideText.js', {
        // eslint-disable-next-line prefer-rest-params
        arrityCheck: { args: arguments, max: 0 },
      })
    ) {
      return {}
    }
  }

  return {
    textIndent: '101%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  }
}

export default hideText
