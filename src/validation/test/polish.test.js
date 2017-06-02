// @flow
import polish from '../polish'

jest.mock('../_validateArity', () => jest.fn(() => true))

const validateArity = require('../_validateArity')

jest.mock('../_deprecationCheck', () => jest.fn(() => true))

const deprecationCheck = require('../_deprecationCheck')

jest.mock('../_validateTypes', () => jest.fn(() => true))

const validateTypes = require('../_validateTypes')

const modulePath = 'module/moduleName'

const mockModule = jest.fn().mockImplementation(css => css)

describe('polish', () => {
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

  it('should call deprecationCheck and validateArity when passed just module path', () => {
    polish({ modulePath })(mockModule)('yes')
    expect(deprecationCheck).toHaveBeenCalled()
    expect(validateArity).toHaveBeenCalled()
    expect(validateTypes).not.toHaveBeenCalled()
  })

  it('should return the mixins value when passed no validation checks', () => {
    expect(polish({ modulePath })(mockModule)('yes')).toEqual('yes')
  })

  it('should call deprecationCheck, validateArity, validateTypes when passed associated validation options', () => {
    polish({
      modulePath,
      types: { param: 'string', type: 'string' },
    })(mockModule)('yes')
    expect(deprecationCheck).toHaveBeenCalled()
    expect(validateArity).toHaveBeenCalled()
    expect(validateTypes).toHaveBeenCalled()
  })

  it('should return the mixins return value when validateArity and validateTypes passes', () => {
    expect(
      polish({
        modulePath,
        types: { param: 'string', type: 'string' },
      })(mockModule)('yes'),
    ).toEqual('yes')
  })

  it('should call deprecationCheck, validateArity, validateTypes, customRule when passed associated config options validation', () => {
    polish({
      modulePath,
      types: { param: 'string', type: 'string' },
      customRule: { enforce: true, msg: '1 equals 1' },
    })(mockModule)('yes')
    expect(deprecationCheck).toHaveBeenCalled()
    expect(validateArity).toHaveBeenCalled()
    expect(validateTypes).toHaveBeenCalled()
  })

  it('should return the mixins return value when all validation passes', () => {
    expect(
      polish({
        modulePath,
        types: { param: 'string', type: 'string' },
        customRule: { enforce: true, msg: '1 equals 1' },
      })(mockModule)('yes'),
    ).toEqual('yes')
  })

  // TODO: Failure Cases
})
