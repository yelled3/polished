// @flow
import arrityCheck from '../_arrityCheck'

describe('arrityCheck', () => {
  const modulePath = 'module/testModule'

  beforeAll(() => {
    global.console = {
      error: jest.fn(),
      warn: jest.fn(),
    }
  })

  // Exactly
  it('should return true when passed exactly the arguments needed', () => {
    expect(
      arrityCheck(modulePath, {
        args: [1],
        exactly: 1,
      }),
    ).toBeTruthy()
  })

  it('should return true when passed more arguments than exactly needed', () => {
    expect(
      arrityCheck(modulePath, {
        args: [1, 2],
        exactly: 1,
      }),
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
      arrityCheck(modulePath, {
        args: [1, 2],
        exactly: 3,
      }),
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
      arrityCheck(modulePath, {
        args: [1],
        min: 1,
      }),
    ).toBeTruthy()
  })

  it('should return true when passed more arguments than minimially needed', () => {
    expect(
      arrityCheck(modulePath, {
        args: [1, 2],
        min: 1,
      }),
    ).toBeTruthy()
  })

  it('should return false when passed less arguments than minimially needed', () => {
    expect(
      arrityCheck(modulePath, {
        args: [1, 2],
        min: 3,
      }),
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
      arrityCheck(modulePath, {
        args: [0],
        max: 1,
      }),
    ).toBeTruthy()
  })

  it('should return true when passed the maximum arguments needed', () => {
    expect(
      arrityCheck(modulePath, {
        args: [1, 2],
        max: 2,
      }),
    ).toBeTruthy()
  })

  it('should return true when passed more than the maximum arguments needed', () => {
    expect(
      arrityCheck(modulePath, {
        args: [1, 2],
        max: 1,
      }),
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
      arrityCheck(modulePath, {
        args: [1, 2],
        max: 0,
      }),
    ).toBeTruthy()
  })

  it('should throw a warning when passed more arguments than maximally needed and max is 0', () => {
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })

  it('should return true when passed no limitations', () => {
    expect(
      arrityCheck(modulePath, {
        args: [1, 2],
      }),
    ).toBeTruthy()
  })

  it('should throw a properly formatted warning when difference in expected and actual is not equal to 1', () => {
    arrityCheck(modulePath, {
      args: [1, 2, 3, 4],
      exactly: 1,
    })
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })
})
