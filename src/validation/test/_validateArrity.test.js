// @flow
import validateArrity from '../_validateArrity'

describe('validateArrity', () => {
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
      validateArrity(
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
      validateArrity(
        modulePath,
        {
          type: 'string',
        },
        [1, 2],
      ),
    ).toBeTruthy()
  })

  it('should throw a warning when passed more arguments than needed', () => {
    validateArrity(
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
      validateArrity(modulePath, [{ type: 'string' }, { type: 'string' }], [1]),
    ).toBeTruthy()
  })

  it('should return true when not passed any types', () => {
    expect(validateArrity(modulePath, undefined, [1])).toBeTruthy()
  })

  it('should throw a properly formatted warning when difference in expected and actual is not equal to 1', () => {
    validateArrity(
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
