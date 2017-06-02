// @flow

/**
 * @private returns if value is a valid CSS position
 */

export const positions = ['absolute', 'fixed', 'relative', 'static', 'sticky']

export default function validatePosition(value: string) {
  return positions.indexOf(value.toLowerCase()) >= 0
}
