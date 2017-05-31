// @flow
import arrityCheck from '../_arrityCheck'

describe('arrityCheck', () => {
  const modulePath = 'module/testModule'

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

  // Exactly
  it('should return true when passed exactly the arguments needed', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          type: 'string',
        },
        [1],
      ),
    ).toBeTruthy()
  })

  it('should return true when passed more arguments than needed', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          type: 'string',
        },
        [1, 2],
      ),
    ).toBeTruthy()
  })

  it('should throw a warning when passed more arguments than needed', () => {
    arrityCheck(
      modulePath,
      {
        type: 'string',
      },
      [1, 2],
    )
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })

  it('should return true when passed less arguments than needed', () => {
    expect(
      arrityCheck(modulePath, [{ type: 'string' }, { type: 'string' }], [1]),
    ).toBeTruthy()
  })

  it('should return true when not passed any types', () => {
    expect(arrityCheck(modulePath, undefined, [1])).toBeTruthy()
  })

  it('should throw a properly formatted warning when difference in expected and actual is not equal to 1', () => {
    arrityCheck(
      modulePath,
      {
        type: 'string',
      },
      [1, 2, 3, 4],
    )
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })
})
