// @flow
import selection from '../selection'

describe('selection', () => {
  const styles = {
    'background-color': 'blue',
  }

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

  it('should properly pass styles object and parent', () => {
    expect({
      div: {
        ...selection(styles, 'section'),
      },
    }).toMatchSnapshot()
  })

  it('should properly default to no parent when not passed one', () => {
    expect({
      div: {
        ...selection(styles),
      },
    }).toMatchSnapshot()
  })

  it('should throw an error when not passed any parameters', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    selection()
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-object as its first parameter', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    selection('styles')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string as its second parameter', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    selection(styles, 1)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw a warning when passed more than 2 parameters', () => {
    selection(styles, 'input', true)
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
