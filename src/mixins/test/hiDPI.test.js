// @flow
import hiDPI from '../hiDPI'

describe('hiDPI', () => {
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

  it('should pass ratio to media query', () => {
    expect({
      [hiDPI(1.5)]: {
        width: '200px',
      },
    }).toMatchSnapshot()
  })

  it('should set a default ratio of 1.3 when no ratio is passed', () => {
    expect({
      [hiDPI()]: {
        width: '200px',
      },
    }).toMatchSnapshot()
  })

  it('should throw an error when called with a non-number value', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    hiDPI('1px')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw a warning when called with more than 1 parameter', () => {
    hiDPI(1, 2)
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })

  it('should throw an error and a warning when called with multiple string values', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    hiDPI('1px', '2px')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
