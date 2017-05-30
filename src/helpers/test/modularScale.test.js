// @flow
import modularScale, { ratioNames } from '../modularScale'

describe('modularScale', () => {
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

  it('should use perfectFourth and 1em base by default', () => {
    expect({ 'font-size': modularScale(1) }).toMatchSnapshot()
    expect({ 'font-size': modularScale(2) }).toMatchSnapshot()
    expect({ 'font-size': modularScale(0) }).toMatchSnapshot()
  })

  it('should allow adjusting the base', () => {
    expect({ 'font-size': modularScale(1, '2em') }).toMatchSnapshot()
  })

  it('should allow adjusting the base with a number value', () => {
    expect({ 'font-size': modularScale(1, 2) }).toMatchSnapshot()
  })

  it('should allow adjusting the ratio', () => {
    expect({ 'font-size': modularScale(1, '1em', 1) }).toMatchSnapshot()
  })

  it('should allow any of the predefined ratio names', () => {
    Object.keys(ratioNames).forEach(ratio => {
      expect({
        'font-size': modularScale(1, '1em', ratioNames[ratio]),
      }).toMatchSnapshot()
    })
  })

  it('should throw a warning if more than 3 parameters are provided', () => {
    modularScale(1, '1em', 'perfectFourth', true)
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })

  it('should throw an error if a non-number value for steps is provided', () => {
    modularScale('invalid')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error if a non-number or non-string value for base is provided', () => {
    modularScale(2, true)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error if an invalid string-based value for base is provided', () => {
    modularScale(2, 'invalid')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error if an invalid ratio is provided', () => {
    modularScale(2, '1em', 'invalid')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })
})
