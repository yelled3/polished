// @flow
import animation from '../animation'

describe('animation', () => {
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
  describe('single mode', () => {
    it('should pass first eight arguments to the CSS', () => {
      expect({
        ...animation(
          'rotate',
          '1s',
          'ease-in-out',
          '0.5s',
          5,
          'reverse',
          'forwards',
          'paused',
        ),
      }).toMatchSnapshot()
    })

    it('should be fine with less than eight arguments', () => {
      expect({ ...animation('rotate', '1s', 'ease-in-out') }).toMatchSnapshot()
    })

    it('should throw a warning if more than eight elements are supplied', () => {
      animation(
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'oops',
      )
      // eslint-disable-next-line no-console
      expect(console.warn.mock.calls).toMatchSnapshot()
    })
  })

  describe('multi mode', () => {
    it('should pass first eight arguments to the CSS in multi mode', () => {
      expect({
        ...animation([
          'rotate',
          '1s',
          'ease-in-out',
          '0.5s',
          5,
          'reverse',
          'forwards',
          'paused',
        ]),
      }).toMatchSnapshot()
    })

    it('should be fine with less than eight arguments', () => {
      expect({
        ...animation(['rotate', '1s', 'ease-in-out']),
      }).toMatchSnapshot()
    })

    it('should be fine with multiple animations', () => {
      expect({
        ...animation(['rotate', '1s', 'ease-in-out'], ['colorchange', '2s']),
      }).toMatchSnapshot()
    })

    it('should throw an error if more than eight elements are supplied in an array', () => {
      expect(() => {
        animation([
          'one',
          'two',
          'three',
          'four',
          'five',
          'six',
          'seven',
          'eight',
          'oops',
        ])
      }).toThrow()
    })

    it('should throw an error if more than eight elements are supplied in a second array', () => {
      expect(() => {
        animation(
          ['rotate'],
          [
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'oops',
          ],
        )
      }).toThrow()
    })
  })

  it('should not allow arrays in single mode', () => {
    expect(() => {
      animation('rotate', ['move', '2s'], '1s')
    }).toThrow()
  })

  it('should not allow simple root level values in multi mode', () => {
    expect(() => {
      animation(['move', '2s'], 'rotate', '2s')
    }).toThrow()
  })
})
