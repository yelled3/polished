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

  // Exactly
  it('should return true when passed exactly the arguments needed', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          exactly: 1,
        },
        [1],
      ),
    ).toBeTruthy()
  })

  it('should return true when passed more arguments than exactly needed', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          exactly: 1,
        },
        [1, 2],
      ),
    ).toBeTruthy()
  })

  it('should throw a warning when passed more arguments than exactly needed', () => {
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })

  it('should return false when passed less arguments than exactly needed', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          exactly: 3,
        },
        [1, 2],
      ),
    ).toBeFalsy()
  })

  it('should throw an error when passed less arguments than exactly needed', () => {
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.error.mockClear()
  })

  // Min
  it('should return true when passed at least the arguments needed', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          min: 1,
        },
        [1],
      ),
    ).toBeTruthy()
  })

  it('should return true when passed more arguments than minimially needed', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          min: 1,
        },
        [1, 2],
      ),
    ).toBeTruthy()
  })

  it('should return false when passed less arguments than minimially needed', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          min: 3,
        },
        [1, 2],
      ),
    ).toBeFalsy()
  })

  it('should throw an error when passed less arguments than minimially needed', () => {
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.error.mockClear()
  })

  // Max
  it('should return true when passed at less than the arguments needed', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          max: 1,
        },
        [0],
      ),
    ).toBeTruthy()
  })

  it('should return true when passed the maximum arguments needed', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          max: 2,
        },
        [1, 2],
      ),
    ).toBeTruthy()
  })

  it('should return true when passed more than the maximum arguments needed', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          max: 1,
        },
        [1, 2],
      ),
    ).toBeTruthy()
  })

  it('should throw a warning when passed more arguments than maximally needed', () => {
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })

  it('should return true when passed more than the maximum arguments needed and max is 0', () => {
    expect(
      arrityCheck(
        modulePath,
        {
          max: 0,
        },
        [1, 2],
      ),
    ).toBeTruthy()
  })

  it('should throw a warning when passed more arguments than maximally needed and max is 0', () => {
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })

  it('should return true when passed no limitations', () => {
    expect(arrityCheck(modulePath, {}, [1, 2])).toBeTruthy()
  })

  it('should throw a properly formatted warning when difference in expected and actual is not equal to 1', () => {
    arrityCheck(
      modulePath,
      {
        exactly: 1,
      },
      [1, 2, 3, 4],
    )
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })
})
