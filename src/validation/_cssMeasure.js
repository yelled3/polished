// @flow

/**
 * Returns the unit from a given CSS value. (or null if an invalid string was passed)
 */

const units = [
  '%',
  'ch',
  'cm',
  'em',
  'ex',
  'ic',
  'in',
  'mm',
  'lh',
  'pc',
  'pt',
  'px',
  'rem',
  'rlh',
  'vh',
  'vi',
  'vb',
  'q',
  'vmax',
  'vmin',
  'vw',
]

const measureKeywords = [
  'auto',
  'max-content',
  'min-content',
  'fill-available',
  'fit-content',
  'inherit',
  'initial',
  'unset',
]

export function validateKeyword(value: string) {
  return measureKeywords.indexOf(value) >= 0
}

export function validateUnit(value: string): string | null {
  if (typeof value !== 'string') return null
  const unit = value.replace(/[^a-zA-Z-%]/g, '')
  return units.indexOf(unit) >= 0 ? unit : null
}
