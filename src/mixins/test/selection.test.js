// @flow
import selection from '../selection'

describe('selection', () => {
  const styles = {
    'background-color': 'blue',
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
      div: {
        ...selection('section', styles),
      },
    }).toMatchSnapshot()
  })

  it('should properly default to no parent when not passed one', () => {
    expect({
      div: {
        ...selection(undefined, styles),
      },
    }).toMatchSnapshot()
  })

  it('should throw 2 errors when not passed any parameters', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    selection()
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string as its first parameter', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    selection(1, styles)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-object as its second parameter', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    selection('main', 'style')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw a warning when passed more than 2 parameters', () => {
    selection('input', styles, true)
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
