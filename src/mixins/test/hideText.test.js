// @flow
import hideText from '../hideText'

describe('hideText', () => {
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

  it('should return the CSS in JS', () => {
    expect({ ...hideText() }).toMatchSnapshot()
  })

  it('should throw a warning when called with any parameters', () => {
    hideText('100%')
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
