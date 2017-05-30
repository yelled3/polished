// @flow
import message from './_message'

// Message Styling
function generateAdditionalStyles(color) {
  const baseStyle = 'color: black; font-size: 12px'
  const highlightStyle = `${baseStyle}; font-weight: bold; color:`
  return [
    `${highlightStyle} green`,
    baseStyle,
    `${highlightStyle} ${color}`,
    baseStyle,
  ]
}

const warningStyles = generateAdditionalStyles('goldenrod')
const errorStyles = generateAdditionalStyles('red')

// Message Fragments
const parametersFrag = parameters =>
  `${parameters === 1 ? 'parameter' : 'parameters'}%c.`
const actualFrag = actual =>
  `However, you passed %c${actual} ${parametersFrag(actual)}`
const additionalFrag = additional =>
  `${additional === 1 ? 'This additional parameter was' : 'These additional parameters were'} ignored.`
const expectedFrag = expected =>
  `expects %c${expected} ${parametersFrag(expected)}`
const expectedMaxFrag = expected =>
  `expects a maximum of %c${expected} ${parametersFrag(expected)}`
const expectedMinFrag = expected =>
  `expects a minimum of %c${expected} ${parametersFrag(expected)}`

/**
 * Handles arrity validation of polished modules.
 * @private
 */
function arrityCheck(modulePath: string, msgConfig: Object, args: Array<any>) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (msgConfig.exactly && args.length > msgConfig.exactly) {
      message(
        'warning',
        `${expectedFrag(msgConfig.exactly)} ${actualFrag(args.length)} ${additionalFrag(args.length)}`,
        modulePath,
        warningStyles,
      )
    }
  }

  /* istanbul ignore next */
  if (msgConfig.exactly && args.length < msgConfig.exactly) {
    if (process.env.NODE_ENV !== 'production') {
      message(
        'error',
        `${expectedFrag(msgConfig.exactly)} ${actualFrag(args.length)}`,
        modulePath,
        errorStyles,
      )
    }

    return false
  }

  if (msgConfig.min && args.length < msgConfig.min) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      message(
        'error',
        `${expectedMinFrag(msgConfig.min)} ${actualFrag(args.length)}`,
        modulePath,
        errorStyles,
      )
    }
    return false
  }

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if ((msgConfig.max || msgConfig.max === 0) && args.length > msgConfig.max) {
      message(
        'warning',
        `${expectedMaxFrag(msgConfig.max)} ${actualFrag(args.length)} ${additionalFrag(args.length)}`,
        modulePath,
        warningStyles,
      )
    }
  }
  return true
}

export default arrityCheck
