// @flow
import borderStyle from '../borderStyle'

describe('borderStyle', () => {
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

  it('properly applies a value when passed only one', () => {
    expect(borderStyle('solid')).toMatchSnapshot()
  })
  it('properly applies values when passed two', () => {
    expect(borderStyle('solid', 'dashed')).toMatchSnapshot()
  })
  it('properly applies values when passed three', () => {
    expect(borderStyle('solid', 'dashed', 'dotted')).toMatchSnapshot()
  })
  it('properly applies values when passed four', () => {
    expect(borderStyle('solid', 'dashed', 'dotted', 'double')).toMatchSnapshot()
  })
  it('throws an error for each invalid value', () => {
    borderStyle('top', 'right', 'bottom', 'left')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })
  it('throws a warning when passed too many parameters', () => {
    borderStyle('solid', 'dashed', 'dotted', 'double', 'none')
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
