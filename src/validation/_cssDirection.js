// @flow

/**
 * @private returns if value is a valid CSS direction
 */

const directions = ['top', 'right', 'bottom', 'left']

export default function validateDirection(value: string) {
  return directions.indexOf(value.toLowerCase()) >= 0
}
