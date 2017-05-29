// @flow
import message from '../_message'

const additionalStyles = [
  'font-weight: bold; font-size: 12px',
  'font-size: 12px',
]
const modulePath = 'modules/moduleName'
const messageBody = 'expects this to be a %ctest message%c.'

describe('message', () => {
  beforeAll(() => {
    global.console = {
      warn: jest.fn(),
      error: jest.fn(),
    }
  })

  it('should throw an error when passed an error message', () => {
    expect(message('error', messageBody, modulePath)).toMatchSnapshot()
    // eslint-disable-next-line no-console
    expect(console.error).toBeCalled()
  })

  it('should throw a warning when passed a warning message', () => {
    expect(message('warning', messageBody, modulePath)).toMatchSnapshot()
    // eslint-disable-next-line no-console
    expect(console.warn).toBeCalled()
  })

  it('should add styles when passed additionalStyles', () => {
    expect(
      message('warning', messageBody, modulePath, additionalStyles),
    ).toMatchSnapshot()
    // eslint-disable-next-line no-console
    expect(console.warn).toBeCalled()
  })

  it('should set modulePath to moduleName when modulePath format is incorrect', () => {
    expect(
      message('warning', messageBody, 'modulePath', additionalStyles),
    ).toMatchSnapshot()
    // eslint-disable-next-line no-console
    expect(console.warn).toBeCalled()
  })
})
