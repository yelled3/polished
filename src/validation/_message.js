// @flow

/**
 * Formats and generates validation messages for polished modules
 * @private
 */

function formatMessage(
  type: string,
  messageBody: string,
  moduleName: string,
  modulePath: string,
) {
  const header = `%c ✨ ${type.toUpperCase()} ✨ ---- ${modulePath} --`

  const body = `%c

${moduleName} %c${messageBody}
  `

  const info = `%c
Please see the documentation at %chttps://polished.js.org/docs/#${moduleName}%c for more information.`

  return `${header}${body}${info}`
}

function message(type: string, messageBody: string, modulePath: string) {
  const moduleNameMatch = modulePath.match(/([^/]+)(?=\.\w+$)/)
  const moduleName = moduleNameMatch ? moduleNameMatch[0] : ''
  const formattedMessage = formatMessage(
    type,
    messageBody,
    moduleName,
    modulePath,
  )
  const headerStyles = 'font-weight: bold; color: black'
  const messageStyles = [
    'color: black; font-size: 12px; font-weight: bold',
    'color: black; font-size: 12px',
    'color: gray; line-height: 1.4',
    'color: blue; line-height: 1.4',
    'color: gray; line-height: 1.4',
  ]

  if (type === 'error') {
    // eslint-disable-next-line no-console
    console.error(formattedMessage, headerStyles, ...messageStyles)
  } else {
    // eslint-disable-next-line no-console
    console.warn(formattedMessage, headerStyles, ...messageStyles)
  }
}

export default message
