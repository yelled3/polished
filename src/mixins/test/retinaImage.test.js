// @flow
import retinaImage from '../retinaImage'

describe('retinaImage', () => {
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

  it('should use _2x and png as the default suffix and extension, respectively', () => {
    expect({ ...retinaImage('img') }).toMatchSnapshot()
  })

  it('should set the background-size if one is passed in', () => {
    expect({ ...retinaImage('img', 'cover') }).toMatchSnapshot()
  })

  it('should set the extension if one is passed in', () => {
    expect({ ...retinaImage('img', undefined, 'jpg') }).toMatchSnapshot()
  })

  it('should allow passing in an extension with a dot', () => {
    expect({ ...retinaImage('img', undefined, '.jpg') }).toMatchSnapshot()
  })

  it('should allow passing in a separate filename for the retina version', () => {
    expect({
      ...retinaImage('img', undefined, undefined, 'retina_img'),
    }).toMatchSnapshot()
  })

  it('should allow passing in a separate suffix for the retina version', () => {
    expect({
      ...retinaImage('img', undefined, undefined, undefined, '_5x'),
    }).toMatchSnapshot()
  })

  it('should throw an error when no parameters are passed', () => {
    retinaImage()
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when a non-string value is passed for fileName', () => {
    retinaImage(1)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when a non-string value is passed for backgroundSize', () => {
    retinaImage('img', 100)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when a non-string value is passed for extension', () => {
    retinaImage('img', undefined, true)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })
})
