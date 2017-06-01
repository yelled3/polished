// @flow
import borderRadius from '../borderRadius'

describe('borderRadius', () => {
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

  it('returns the proper values for the top side', () => {
    expect(borderRadius('top', '5px')).toMatchSnapshot()
  })
  it('returns the proper values for the bottom side', () => {
    expect(borderRadius('bottom', '5px')).toMatchSnapshot()
  })
  it('returns the proper values for the right side', () => {
    expect(borderRadius('right', '5px')).toMatchSnapshot()
  })
  it('returns the proper values for the left side', () => {
    expect(borderRadius('left', '5px')).toMatchSnapshot()
  })

  it('should throw 2 errors when not passed any parameters', () => {
    borderRadius()
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when not passed a direction', () => {
    borderRadius(null, '5px')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when not passed a radius', () => {
    borderRadius('top')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed an invalid direction', () => {
    borderRadius('all', '5px')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed an invalid radius', () => {
    borderRadius('top', 1)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw a warrning when passed too many parameters', () => {
    borderRadius('top', '5px', '5px')
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
