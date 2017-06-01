// @flow

/**
 * @private returns if valud is a valid CSS direction
 */

const borderStyles = [
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
  'initial',
  'inherit',
]

export default function validateBorderStyle(value: string) {
  return borderStyles.indexOf(value.toLowerCase()) >= 0
}
