// @flow

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

// Styles
const headerStyles = 'font-weight: bold; color: black'
const docStyles = color => `color: ${color}; line-height: 1.4`
const baseStyles = 'color: black; font-size: 12px'

/**
 * Formats and generates validation messages for polished modules
 * @private
 */
function message(
  type: string,
  messageBody: string,
  modulePath: string,
  additionalStyles: Array<string> = [],
) {
  const moduleNameMatch = modulePath.match(/([^/]+)(?=\.\w+$)/)
  const moduleName = moduleNameMatch ? moduleNameMatch[0] : modulePath
  const formattedMessage = formatMessage(
    type,
    messageBody,
    moduleName,
    modulePath,
  )

  const messageStyles = [
    `${baseStyles}; font-weight: bold`,
    baseStyles,
    ...additionalStyles,
    docStyles('gray'),
    docStyles('blue'),
    docStyles('gray'),
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
