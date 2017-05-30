// @flow
import triangle from '../triangle'

describe('triangle', () => {
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

  it('should generate a proper triangle when passed all parameters', () => {
    expect({
      ...triangle({
        foregroundColor: 'red',
        backgroundColor: 'black',
        pointingDirection: 'right',
        height: '10px',
        width: '20px',
      }),
    }).toMatchSnapshot()
  })

  it('should default to a transparent background when not passed a backgroundColor', () => {
    expect({
      ...triangle({
        foregroundColor: 'red',
        pointingDirection: 'right',
        height: '10px',
        width: '20px',
      }),
    }).toMatchSnapshot()
  })

  it('should generate a proper triangle when passed string values for height and width', () => {
    expect({
      ...triangle({
        foregroundColor: 'red',
        backgroundColor: 'black',
        pointingDirection: 'right',
        height: '10px',
        width: '20px',
      }),
    }).toMatchSnapshot()
  })

  it('should properly render top pointing arrow with green foregroundColor, width of 20px and height 20px', () => {
    expect({
      ...triangle({
        foregroundColor: 'green',
        pointingDirection: 'top',
        height: '20px',
        width: '20px',
      }),
    }).toMatchSnapshot()
  })

  it('should properly render right pointing arrow with width of 20px and height 10px', () => {
    expect({
      ...triangle({
        foregroundColor: 'red',
        pointingDirection: 'right',
        height: '10px',
        width: '20px',
      }),
    }).toMatchSnapshot()
  })

  it('should properly render bottom pointing arrow with red foregroundColor, width of 20px and height 20px', () => {
    expect({
      ...triangle({
        foregroundColor: 'red',
        pointingDirection: 'bottom',
        height: '20px',
        width: '10px',
      }),
    }).toMatchSnapshot()
  })

  it('should properly render left pointing arrow with blue foregroundColor, width of 10px and height 20px', () => {
    expect({
      ...triangle({
        foregroundColor: 'blue',
        pointingDirection: 'left',
        height: '20px',
        width: '10px',
      }),
    }).toMatchSnapshot()
  })

  it('should throw an error when not passed any parameters', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    triangle()
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when not passed a foregroundColor', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    triangle({
      pointingDirection: 'left',
      height: '20px',
      width: '10px',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when not passed a pointingDirection', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    triangle({
      foregroundColor: 'blue',
      height: '20px',
      width: '10px',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when not passed a height', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    triangle({
      foregroundColor: 'blue',
      pointingDirection: 'left',
      width: '10px',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when not passed a width', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    triangle({
      foregroundColor: 'blue',
      pointingDirection: 'left',
      height: '20px',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for foregroundColor', () => {
    triangle({
      // $FlowIgnoreNextLine since the coming is invalid code, flow complains
      foregroundColor: true,
      pointingDirection: 'left',
      height: 'inherit',
      width: '10px',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for pointingDirection', () => {
    triangle({
      foregroundColor: 'blue',
      // $FlowIgnoreNextLine since the coming is invalid code, flow complains
      pointingDirection: true,
      height: 'inherit',
      width: '10px',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for height', () => {
    triangle({
      foregroundColor: 'blue',
      pointingDirection: 'left',
      // $FlowIgnoreNextLine since the coming is invalid code, flow complains
      height: 10,
      width: '10px',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string value for width', () => {
    triangle({
      foregroundColor: 'blue',
      pointingDirection: 'left',
      height: '10px',
      // $FlowIgnoreNextLine since the coming is invalid code, flow complains
      width: 10,
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed an invalid height', () => {
    triangle({
      foregroundColor: 'blue',
      pointingDirection: 'left',
      height: 'inherit',
      width: '10px',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed an invalid width', () => {
    triangle({
      foregroundColor: 'blue',
      pointingDirection: 'left',
      height: 'inherit',
      width: '10px',
    })
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })
})
