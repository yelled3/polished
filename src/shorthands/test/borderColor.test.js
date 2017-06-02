// @flow
import borderColor from '../borderColor'

describe('borderColor', () => {
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
    expect(borderColor('red')).toMatchSnapshot()
  })
  it('properly applies values when passed two', () => {
    expect(borderColor('red', 'blue')).toMatchSnapshot()
  })
  it('properly applies values when passed three', () => {
    expect(borderColor('red', 'blue', 'green')).toMatchSnapshot()
  })
  it('properly applies values when passed four', () => {
    expect(borderColor('red', 'blue', 'green', 'yellow')).toMatchSnapshot()
  })
  it('throws an error for each invalid value', () => {
    borderColor(1, 2, 3, 4)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })
  it('throws a warning when passed too many parameters', () => {
    borderColor('red', 'blue', 'green', 'yellow', 'purple')
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
