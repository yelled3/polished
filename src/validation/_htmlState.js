// @flow

/**
 * @private returns if value is a valid HTML State
 */

const states = [undefined, null, 'active', 'focus', 'hover']

export default function validateState(value: string) {
  return states.indexOf(value.toLowerCase()) >= 0
}
