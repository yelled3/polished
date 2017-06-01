// @flow
import message from './_message'

/**
 * Handles arrity validation of polished modules.
 * @private
 */
function validateArrity(modulePath: string, types: Object, args: Array<any>) {
  let arrity
  if (!types) {
    arrity = 0
  } else {
    arrity = types.length ? types.length : 1
  }
  if (args.length > arrity) {
    message(
      'warning',
      `expects a maximum of %c${arrity} ${arrity === 1 ? 'parameter' : 'parameters'}%c. However, you passed %c${args.length} ${args.length === 1 ? 'parameter' : 'parameters'}%c. ${args.length - arrity === 1 ? 'This additional parameter was' : 'These additional parameters were'} ignored.`,
      modulePath,
      [
        'color: black; font-size: 12px; font-weight: bold; color: green',
        'color: black; font-size: 12px',
        'color: black; font-size: 12px; font-weight: bold; color: goldenrod',
        'color: black; font-size: 12px',
      ],
    )
  }
  return true
}

export default validateArrity
