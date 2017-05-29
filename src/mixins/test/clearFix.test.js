// @flow
import clearFix from '../clearFix'

describe('clearFix', () => {
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

  it('should pass parent to pseudo selector', () => {
    expect(clearFix('div')).toMatchSnapshot()
  })

  it('should default to & when no parent is passed', () => {
    expect(clearFix()).toMatchSnapshot()
  })

  it('should throw an error when called with a non-string value', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    clearFix(1)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw a warning when called with more than 1 parameter', () => {
    clearFix('&', 2)
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })

  it('should throw an error and a warning when called with multiple non-string values', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    clearFix(1, 2)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
