// @flow
import validateModule, {
  customRule,
  typeCheck,
} from '../validation/_validateModule'

/** */
type FontFaceConfiguration = {
  fontFamily: string,
  fontFilePath?: string,
  fontStretch?: string,
  fontStyle?: string,
  fontVariant?: string,
  fontWeight?: string,
  fileFormats?: Array<string>,
  localFonts?: Array<string>,
  unicodeRange?: string,
}

function generateFileReferences(
  fontFilePath: string,
  fileFormats: Array<string>,
) {
  const fileFontReferences = fileFormats.map(
    format => `url("${fontFilePath}.${format}")`,
  )
  return fileFontReferences.join(', ')
}

function generateLocalReferences(localFonts: Array<string>) {
  const localFontReferences = localFonts.map(font => `local("${font}")`)
  return localFontReferences.join(', ')
}

function generateSources(
  fontFilePath?: string,
  localFonts?: Array<string>,
  fileFormats: Array<string>,
) {
  const fontReferences = []
  if (localFonts) fontReferences.push(generateLocalReferences(localFonts))
  if (fontFilePath) {
    fontReferences.push(generateFileReferences(fontFilePath, fileFormats))
  }
  return fontReferences.join(', ')
}

/**
 * CSS for a @font-face declaration.
 *
 * @example
 * // Styles as object basic usage
 * const styles = {
 *    ...fontFace({
 *      'fontFamily': 'Sans-Pro'
 *      'fontFilePath': 'path/to/file'
 *    })
 * }
 *
 * // styled-components basic usage
 * injectGlobal`${
 *   fontFace({
 *     'fontFamily': 'Sans-Pro'
 *     'fontFilePath': 'path/to/file'
 *   }
 * )}`
 *
 * // CSS as JS Output
 *
 * '@font-face': {
 *   'fontFamily': 'Sans-Pro',
 *   'src': 'url("path/to/file.eot"), url("path/to/file.woff2"), url("path/to/file.woff"), url("path/to/file.ttf"), url("path/to/file.svg")',
 * }
 */

function fontFace(config: FontFaceConfiguration) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      !validateModule('mixins/fontFace.js', {
        // eslint-disable-next-line prefer-rest-params
        arrityCheck: { args: arguments, exactly: 1 },
        typeCheck: {
          param: config,
          type: 'object',
          required: 'requires a config object as its only parameter. However, you did not provide one.',
        },
      })
    ) {
      return {}
    }
  }

  const {
    fontFamily,
    fontFilePath,
    fontStretch,
    fontStyle,
    fontVariant,
    fontWeight,
    fileFormats = ['eot', 'woff2', 'woff', 'ttf', 'svg'],
    localFonts,
    unicodeRange,
  } = config

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (
      !typeCheck('mixins/fontFace.js', [
        {
          param: fontFamily,
          type: 'string',
          required: 'expects a value for fontFamily that provides a name of a font-family(string).',
        },
        { param: fontFilePath, type: 'string' },
        { param: fontStretch, type: 'string' },
        { param: fontStyle, type: 'string' },
        { param: fontVariant, type: 'string' },
        { param: fontWeight, type: 'string' },
        { param: fileFormats, type: 'array' },
        { param: localFonts, type: 'array' },
        { param: unicodeRange, type: 'string' },
      ]) ||
      !customRule('mixins/fontFace.js', {
        enforce: fontFilePath || localFonts,
        msg: 'fontFace expects either the path to the font file(s) or a name of a local copy.',
      })
    ) {
      return {}
    }
  }

  const fontFaceDeclaration = {
    '@font-face': {
      fontFamily,
      src: generateSources(fontFilePath, localFonts, fileFormats),
      unicodeRange,
      fontStretch,
      fontStyle,
      fontVariant,
      fontWeight,
    },
  }

  // Removes undefined fields for cleaner css object.
  return JSON.parse(JSON.stringify(fontFaceDeclaration))
}

export default fontFace
