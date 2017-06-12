// @flow
import message from './_message'

/**
 * Handles arity validation of polished modules.
 * @private
 */
function validateArity(modulePath: string, types: Object, args: Array<any>) {
  let arity

  if (!types) arity = 0
  else if (types.maxLength && types.matchAll) arity = types.maxLength
  else if (types.length) arity = types.length
  else arity = 1

  if (args.length > arity) {
    message(
      'warning',
      `expects a maximum of %c${arity} ${arity === 1 ? 'parameter' : 'parameters'}%c. However, you passed %c${args.length} ${args.length === 1 ? 'parameter' : 'parameters'}%c. ${args.length - arity === 1 ? 'This additional parameter was' : 'These additional parameters were'} ignored.`,
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

export default validateArity
