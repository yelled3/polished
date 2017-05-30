// @flow
import validateModule, { customRule } from '../validation/_validateModule'

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

function fontFace(
  fontFamily: string,
  fontFilePath?: string,
  fontStretch?: string,
  fontStyle?: string,
  fontVariant?: string,
  fontWeight?: string,
  fileFormats?: Array<string> = ['eot', 'woff2', 'woff', 'ttf', 'svg'],
  localFonts?: Array<string>,
  unicodeRange?: string,
) {
  if (
    !customRule('mixins/fontFace', {
      enforce: fontFilePath || localFonts,
      msg: 'fontFace expects either the path to the font file(s) or a name of a local copy. However, you provided neither.',
    })
  ) {
    return {}
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
export default validateModule({
  modulePath: 'mixins/fontFace',
  arrityCheck: { min: 1, max: 9 },
  typeCheck: [
    {
      key: 'fontFamily',
      type: 'string',
      required: true,
    },
    { key: 'fontFilePath', type: 'string' },
    { key: 'fontStretch', type: 'string' },
    { key: 'fontStyle', type: 'string' },
    { key: 'fontVariant', type: 'string' },
    { key: 'fontWeight', type: 'string' },
    { key: 'fileFormats', type: 'array' },
    { key: 'localFonts', type: 'array' },
    { key: 'unicodeRange', type: 'string' },
  ],
})(fontFace)
