// @flow
import deprecationCheck from '../_deprecationCheck'

jest.mock('../_deprecated', () => ({
  'module/deprecatedModule.js': {
    version: '3.0',
    guidance: 'You should use the %c::currentModule%c instead.',
  },
}))

describe('deprecationCheck', () => {
  beforeAll(() => {
    global.console = {
      warn: jest.fn(),
      log: global.console.log,
    }
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should throw a warning when the module is deprecated', () => {
    deprecationCheck('module/deprecatedModule.js')
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })

  it('should not throw a warning when the module is not deprecated', () => {
    deprecationCheck('module/currentModule.js')
    // eslint-disable-next-line no-console
    expect(console.warn.mock.calls).toMatchSnapshot()
    // eslint-disable-next-line no-console
    console.warn.mockClear()
  })
})
