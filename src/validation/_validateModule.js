// @flow
import arrityCheck from './_arrityCheck'
import customRule from './_customRule'
import deprecationCheck from './_deprecationCheck'
import typeCheck from './_typeCheck'

/**
 * Handles validation of polished modules.
 * @private
 */

function setValidationStatus(currentStatus, newStatus) {
  return !currentStatus ? currentStatus : newStatus
}

function unpackObject(args, config) {
  const argsArray = []
  config.types.forEach(conf => {
    argsArray.push(args[conf.key])
  })
  return argsArray
}

function validateModule(config: Object) {
  const isDev = process.env.NODE_ENV !== 'production'
  /* istanbul ignore next */
  if (isDev) {
    deprecationCheck(config.modulePath)
  }

  return function(module: Function) {
    let isValid = true

    return function(...args: Array<any>) {
      const unpackedArgs = typeof args[0] === 'object' && args[0] !== null
        ? unpackObject(args[0], config)
        : args

      /* istanbul ignore next */
      if (process.env.NODE_ENV !== 'production') {
        isValid = setValidationStatus(
          isValid,
          arrityCheck(config.modulePath, config.types, unpackedArgs),
        )
      }

      if (config.types) {
        isValid = setValidationStatus(
          isValid,
          typeCheck(config.modulePath, config.types, unpackedArgs),
        )
      }
      if (config.customRule) {
        isValid = setValidationStatus(
          isValid,
          customRule(config.modulePath, config.customRule),
        )
      }

      const errReturnValue = config.errReturn ? config.errReturn : {}

      /* istanbul ignore next */
      if (!isDev && !isValid) {
        // eslint-disable-next-line no-console
        console.warn(
          'You have experience 1 or more minified ✨ polished errors. You can use the non-minified dev environment for full errors and additional helpful warnings.',
        )
      }

      return isValid ? module(...unpackedArgs) : errReturnValue
    }
  }
}

export { arrityCheck, customRule, deprecationCheck, typeCheck }

export default validateModule
