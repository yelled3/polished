// @flow
import placeholder from '../placeholder'

describe('placeholder', () => {
  const styles = {
    color: 'blue',
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
      ...placeholder(styles, 'input'),
    }).toMatchSnapshot()
  })

  it('should properly default to & when not passed a parent', () => {
    expect({
      input: {
        ...placeholder(styles),
      },
    }).toMatchSnapshot()
  })

  it('should throw an error when not passed any parameters', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    placeholder()
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-object as its first parameter', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    placeholder('styles')
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw an error when passed a non-string as its second parameter', () => {
    // $FlowIgnoreNextLine since the coming is invalid code, flow complains
    placeholder(styles, 1)
    // eslint-disable-next-line no-console
    expect(console.error.mock.calls).toMatchSnapshot()
  })

  it('should throw a warning when passed more than 2 parameters', () => {
    placeholder(styles, 'input', true)
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
  })
})
