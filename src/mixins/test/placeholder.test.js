// @flow
import placeholder from '../placeholder'

describe('placeholder', () => {
  const styles = {
    color: 'blue',
  }

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

  it('should properly pass parent and styles object', () => {
    expect({
      ...placeholder('input', styles),
    }).toMatchSnapshot()
  })

  it('should properly default to & when not passed a parent', () => {
    expect({
      input: {
        ...placeholder(undefined, styles),
      },
    }).toMatchSnapshot()
  })

  it('should throw 2 errors when not passed any parameters', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    placeholder()
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string as its first parameter', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    placeholder(1, styles)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-object as its second parameter', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    placeholder('input', 'styles')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw a warning when passed more than 2 parameters', () => {
    placeholder('p', styles, true)
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
