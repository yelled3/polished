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
function arrityCheck(modulePath: string, msgConfig: Object) {
  if (msgConfig.exactly && msgConfig.args.length !== msgConfig.exactly) {
    if (msgConfig.args.length > msgConfig.exactly) {
      message(
        'warning',
        `${expectedFrag(msgConfig.exactly)} ${actualFrag(msgConfig.args.length)} ${additionalFrag(msgConfig.args.length)}`,
        modulePath,
        warningStyles,
      )
    } else {
      message(
        'error',
        `${expectedFrag(msgConfig.exactly)} ${actualFrag(msgConfig.args.length)}`,
        modulePath,
        errorStyles,
      )
      return false
    }
  }

  if (msgConfig.min && msgConfig.args.length < msgConfig.min) {
    message(
      'error',
      `${expectedMinFrag(msgConfig.min)} ${actualFrag(msgConfig.args.length)}`,
      modulePath,
      errorStyles,
    )
    return false
  }

  if (
    (msgConfig.max || msgConfig.max === 0) &&
    msgConfig.args.length > msgConfig.max
  ) {
    message(
      'warning',
      `${expectedMaxFrag(msgConfig.max)} ${actualFrag(msgConfig.args.length)} ${additionalFrag(msgConfig.args.length)}`,
      modulePath,
      warningStyles,
    )
  }
  return true
}

export default arrityCheck
