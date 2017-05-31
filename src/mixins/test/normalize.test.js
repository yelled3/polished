// @flow
import normalize from '../normalize'

describe('normalize', () => {
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

  it('should default to all rules', () => {
    expect(normalize()).toMatchSnapshot()
  })

  it('should only return unopinionated rules, when passed true', () => {
    expect(normalize(true)).toMatchSnapshot()
  })

  it('should throw an error when called with a non-boolean value', () => {
    normalize('false')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw a warning when called with more than 1 parameter', () => {
    normalize(true, 1)
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })

  it('should throw an error and a warning when called with multiple non-boolean values', () => {
    normalize('1', 'rules')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
