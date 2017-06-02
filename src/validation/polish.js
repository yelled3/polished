// @flow
import deprecationCheck from './_deprecationCheck'
import validateArity from './_validateArity'
import validateTypes from './_validateTypes'

type PolishConfiguration = {
  modulePath: string,
  types: Object | Array<Object>,
  errReturn: any,
}

function setValidationStatus(currentStatus, newStatus) {
  return !currentStatus ? currentStatus : newStatus
}

function unpackObject(args, types) {
  const argsArray = []
  types.forEach(type => {
    argsArray.push(args[type.key])
  })
  return argsArray
}

/**
 * Handles validation of polished modules.
 * @private
 */
function polish({ modulePath, types, errReturn }: PolishConfiguration) {
  return function validateModule(module: Function) {
    if (typeof module !== 'function') {
      // eslint-disable-next-line no-console
      console.error('You must submit a valid function to be ✨ polished.')
    }

    return function validateInput(...args: Array<any>) {
      const isDev = process.env.NODE_ENV !== 'production'
      /* istanbul ignore next */
      if (isDev) {
        deprecationCheck(modulePath)
      }

      let isValid = true
      const unpackedArgs = typeof args[0] === 'object' &&
        args[0] !== null &&
        !Array.isArray(args[0])
        ? unpackObject(args[0], types)
        : args

      /* istanbul ignore next */
      if (isDev) {
        isValid = setValidationStatus(
          isValid,
          validateArity(modulePath, types, unpackedArgs),
        )
      }

      if (types) {
        isValid = setValidationStatus(
          isValid,
          validateTypes(modulePath, types, unpackedArgs),
        )
      }

      const errReturnValue = errReturn || {}

      /* istanbul ignore next */
      if (!isDev && !isValid) {
        // eslint-disable-next-line no-console
        console.error(
          'You have experienced 1 or more minified ✨ polished errors. You can use the non-minified dev environment for full errors and additional helpful warnings.',
        )
      }

      return isValid ? module(...unpackedArgs) : errReturnValue
    }
  }
}

export default polish
