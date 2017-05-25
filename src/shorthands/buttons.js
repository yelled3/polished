// @flow
import statefulSelectors from '../internalHelpers/_statefulSelectors'
import { deprecatedCheck } from '../internalHelpers/_messageHandlers'

const stateMap = [undefined, null, 'active', 'focus', 'hover']

function template(state) {
  return `button${state},
  input[type="button"]${state},
  input[type="reset"]${state},
  input[type="submit"]${state}`
}

/** */
type ButtonState = typeof undefined | null | 'active' | 'focus' | 'hover'

/**
 * Populates selectors that target all buttons. You can pass optional states to append to the selectors.
 * @example
 * // Styles as object usage
 * const styles = {
 *   [buttons('active')]: {
 *     'border': 'none'
 *   }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   > ${buttons('active')} {
 *     border: none;
 *   }
 * `
 *
 * // CSS in JS Output
 *
 *  'button:active,
 *  'input[type="button"]:active,
 *  'input[type=\"reset\"]:active,
 *  'input[type=\"submit\"]:active: {
 *   'border': 'none'
 * }
 */

function buttons(...states: Array<ButtonState>) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    const modulePath = 'shorthands/buttons.js'
    deprecatedCheck(modulePath)
  }

  return statefulSelectors(states, template, stateMap)
}

export default buttons
