// @flow
import ellipsis from '../ellipsis'

describe('ellipsis', () => {
  beforeAll(() => {
    global.console = {
      error: jest.fn(),
      warn: jest.fn(),
    }
  })

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.error.mockClear()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })

  it('should pass parameter to the value of max-width', () => {
    expect({ ...ellipsis('300px') }).toMatchSnapshot()
  })

  it('should properly add rules when block has existing rules', () => {
    expect({
      background: 'red',
      ...ellipsis('300px'),
    }).toMatchSnapshot()
  })

  it('should default max-width to 100%', () => {
    expect({ ...ellipsis() }).toMatchSnapshot()
  })

  it('should throw an error when called with a non-string value', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    ellipsis(1)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw a warning when called with more than 1 parameter', () => {
    ellipsis('100%', 2)
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })

  it('should throw an error and a warning when called with multiple non-string values', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    ellipsis(1, 2)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
