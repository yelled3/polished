// @flow
import stripUnit from './stripUnit'
import validateModule, { customRule } from '../validation/_validateModule'

const ratioNames = {
  minorSecond: 1.067,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  augFourth: 1.414,
  perfectFifth: 1.5,
  minorSixth: 1.6,
  goldenSection: 1.618,
  majorSixth: 1.667,
  minorSeventh: 1.778,
  majorSeventh: 1.875,
  octave: 2,
  majorTenth: 2.5,
  majorEleventh: 2.667,
  majorTwelfth: 3,
  doubleOctave: 4,
}

/** */
type Ratio =
  | number
  | 'minorSecond'
  | 'majorSecond'
  | 'minorThird'
  | 'majorThird'
  | 'perfectFourth'
  | 'augFourth'
  | 'perfectFifth'
  | 'minorSixth'
  | 'goldenSection'
  | 'majorSixth'
  | 'minorSeventh'
  | 'majorSeventh'
  | 'octave'
  | 'majorTenth'
  | 'majorEleventh'
  | 'majorTwelfth'
  | 'doubleOctave'

/**
 * Establish consistent measurements and spacial relationships throughout your projects by incrementing up or down a defined scale. We provide a list of commonly used scales as pre-defined variables, see below.
 * @example
 * // Styles as object usage
 * const styles = {
 *    // Increment two steps up the default scale
 *   'fontSize': modularScale(2)
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *    // Increment two steps up the default scale
 *   fontSize: ${modularScale(2)}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'fontSize': '1.77689em'
 * }
 */
function modularScale(
  steps: number,
  base?: number | string = '1em',
  ratio?: Ratio = 'perfectFourth',
) {
  const realBase = typeof base === 'string' ? stripUnit(base) : base
  const realRatio = typeof ratio === 'string' ? ratioNames[ratio] : ratio

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      !customRule('helpers/modularScale', {
        enforce: typeof realBase === 'number',
        msg: `expects base to be a valid em-based string value. However, you passed ${base} instead.`,
      })
    ) {
      return ''
    }
  }

  return `${realBase * realRatio ** steps}em`
}

export { ratioNames }
export default validateModule({
  modulePath: 'helpers/modularScale',
  types: [
    { type: 'number', required: true },
    { type: ['number', 'string'] },
    { type: ['number', 'enumberable'], map: ratioNames },
  ],
  errReturn: '',
})(modularScale)
