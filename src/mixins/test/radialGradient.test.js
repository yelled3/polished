// @flow
import radialGradient from '../radialGradient'

describe('radialGradient', () => {
  beforeAll(() => {
    global.console = {
      error: jest.fn(),
      warn: jest.fn(),
    }
  })

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.error.mockClear()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })

  it('returns the correct object when only passed two color stops, including parsed fallback with no percentage', () => {
    expect({
      ...radialGradient({
        colorStops: ['#fff', '#000'],
      }),
    }).toMatchSnapshot()
  })

  it('returns the correct object when passed extent, shape, and position, including parsed fallback with percentage', () => {
    expect({
      ...radialGradient({
        colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
        extent: 'farthest-corner at 45px 45px',
        position: 'center',
        shape: 'ellipse',
      }),
    }).toMatchSnapshot()
  })

  it('returns the correct object when passed extent and shape', () => {
    expect({
      ...radialGradient({
        colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
        extent: 'farthest-corner at 45px 45px',
        shape: 'ellipse',
      }),
    }).toMatchSnapshot()
  })

  it('returns the correct object when passed just extent', () => {
    expect({
      ...radialGradient({
        colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
        extent: 'farthest-corner at 45px 45px',
      }),
    }).toMatchSnapshot()
  })

  it('properly overrides the fallback when it is passed', () => {
    expect({
      ...radialGradient({
        colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
        extent: 'farthest-corner at 45px 45px',
        fallback: '#FFF',
      }),
    }).toMatchSnapshot()
  })

  it('should throw a warning when passed more than one parameter', () => {
    radialGradient(
      {
        colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
        extent: 'farthest-corner at 45px 45px',
        fallback: '#FFF',
      },
      1,
    )
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when not provided any parameters', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    radialGradient()
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-object value', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    radialGradient(1)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when not passed a value for colorStops', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    radialGradient({})
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-array value for colorStops', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    radialGradient({ colorStops: true })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed an array with less than two values for colorStops', () => {
    radialGradient({ colorStops: ['#00FFFF 0%'] })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for extent', () => {
    radialGradient({
      colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
      // $FlowIgnoreNextLine since the coming is invalid code, flow complains
      extent: true,
      position: 'center',
      shape: 'ellipse',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for position', () => {
    radialGradient({
      colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
      // $FlowIgnoreNextLine since the coming is invalid code, flow complains
      position: true,
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for shape', () => {
    radialGradient({
      colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
      // $FlowIgnoreNextLine since the coming is invalid code, flow complains
      shape: true,
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })
})
