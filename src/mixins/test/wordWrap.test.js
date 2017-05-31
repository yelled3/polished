// @flow
import wordWrap from '../wordWrap'

describe('wordWrap', () => {
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

  it('should accept break-word and properly set word-break to break-all', () => {
    expect({
      ...wordWrap('break-word'),
    }).toMatchSnapshot()
  })

  it('should accept normal as a value', () => {
    expect({
      ...wordWrap('normal'),
    }).toMatchSnapshot()
  })

  it('should default wrap to break-word', () => {
    expect({
      ...wordWrap(),
    }).toMatchSnapshot()
  })

  it('should throw an error when called with a non-string value', () => {
    wordWrap(1)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when called with an invalid string value', () => {
    wordWrap('break-all')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw a warning when called with more than 1 parameter', () => {
    wordWrap('break-all', 2)
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })

  it('should throw an error and a warning when called with multiple non-string values', () => {
    wordWrap(1, 2)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
