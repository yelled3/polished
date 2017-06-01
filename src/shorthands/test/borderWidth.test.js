// @flow
import borderWidth from '../borderWidth'

describe('borderWidth', () => {
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
    expect(borderWidth('12px')).toMatchSnapshot()
  })
  it('properly applies values when passed two', () => {
    expect(borderWidth('12px', '24px')).toMatchSnapshot()
  })
  it('properly applies values when passed three', () => {
    expect(borderWidth('12px', '24px', '36px')).toMatchSnapshot()
  })
  it('properly applies values when passed four', () => {
    expect(borderWidth('12px', '24px', '36px', '48px')).toMatchSnapshot()
  })
  it('throws an error for each invalid value', () => {
    borderWidth('top', 'right', 'bottom', 'left')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })
  it('throws a warning when passed too many parameters', () => {
    borderWidth('12px', '24px', '36px', '48px', 'none')
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
