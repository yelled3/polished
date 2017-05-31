// @flow
import fontFace from '../fontFace'

describe('fontFace', () => {
  beforeAll(() => {
    global.console = {
      error: jest.fn(),
      warn: jest.fn(),
      log: global.console.log,
    }
  })

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.error.mockClear()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })

  it('should return a valid object when passed just a family and source', () => {
    expect({
      ...fontFace({
        fontFamily: 'Sans Pro',
        fontFilePath: 'path/to/file',
      }),
    }).toMatchSnapshot()
  })

  it('should return a valid object when passed both local and file-based sources', () => {
    expect({
      ...fontFace({
        fontFamily: 'Sans Pro',
        localFonts: ['sans-pro'],
        fontFilePath: 'path/to/file',
      }),
    }).toMatchSnapshot()
  })

  it('should return a valid object when passed both a file-based source and multiple local sources', () => {
    expect({
      ...fontFace({
        fontFamily: 'Sans Pro',
        localFonts: ['sans-pro', 'sans pro'],
        fontFilePath: 'path/to/file',
      }),
    }).toMatchSnapshot()
  })

  it('should return a valid object when passed only local sources', () => {
    expect({
      ...fontFace({
        fontFamily: 'Sans Pro',
        localFonts: ['sans-pro', 'sans pro'],
      }),
    }).toMatchSnapshot()
  })

  it('should respect the file format configuration object', () => {
    expect({
      ...fontFace({
        fontFamily: 'Sans Pro',
        fontFilePath: 'path/to/file',
        fileFormats: ['eot', 'svg'],
      }),
    }).toMatchSnapshot()
  })

  it('should set passed font configuration variables', () => {
    expect({
      ...fontFace({
        fontFamily: 'Sans Pro',
        fontFilePath: 'path/to/file',
        fontStretch: 'condensed',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontVariant: 'small-caps',
        unicodeRange: 'U+26',
      }),
    }).toMatchSnapshot()
  })

  it('should throw an error when not passed a fontFilePath or localFonts', () => {
    fontFace({
      fontFamily: 'Sans Pro',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when not provided any parameters', () => {
    fontFace()
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when not passed a value for fontFamily', () => {
    fontFace({
      fontFilePath: 'path/to/file',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for fontFamily', () => {
    fontFace({
      fontFamily: 100,
      fontFilePath: 'path/to/file',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for fontFilePath', () => {
    fontFace({
      fontFamily: 'Sans Pro',
      fontFilePath: 100,
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for fontStyle', () => {
    fontFace({
      fontFamily: 'Sans Pro',
      fontFilePath: 'path/to/file',
      fontStyle: 100,
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for fontStretch', () => {
    fontFace({
      fontFamily: 'Sans Pro',
      fontFilePath: 'path/to/file',
      fontStretch: true,
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for fontWeight', () => {
    fontFace({
      fontFamily: 'Sans Pro',
      fontFilePath: 'path/to/file',
      fontWeight: true,
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for fontVariant', () => {
    fontFace({
      fontFamily: 'Sans Pro',
      fontFilePath: 'path/to/file',
      fontVariant: 100,
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-array value for localFonts', () => {
    fontFace({
      fontFamily: 'Sans Pro',
      localFonts: 'sans-pro',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for unicodeRange', () => {
    fontFace({
      fontFamily: 'Sans Pro',
      fontFilePath: 'path/to/file',
      unicodeRange: 26,
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })
})
