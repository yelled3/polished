// @flow
import validateModule from '../_validateModule'

jest.mock('../_arrityCheck', () => jest.fn(() => true))

const arrityCheck = require('../_arrityCheck')

jest.mock('../_customRule', () => jest.fn(() => true))

const customRule = require('../_customRule')

jest.mock('../_deprecationCheck', () => jest.fn(() => true))

const deprecationCheck = require('../_deprecationCheck')

jest.mock('../_typeCheck', () => jest.fn(() => true))

const typeCheck = require('../_typeCheck')

const modulePath = 'module/moduleName'

const mockModule = jest.fn().mockImplementation(css => css)

describe('validateModule', () => {
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

  it('should call deprecationCheck and arrityCheck when passed just module path', () => {
    validateModule({ modulePath })(mockModule)('yes')
    expect(deprecationCheck).toHaveBeenCalled()
    expect(arrityCheck).toHaveBeenCalled()
    expect(typeCheck).not.toHaveBeenCalled()
    expect(customRule).not.toHaveBeenCalled()
  })

  it('should return the mixins value when passed no validation checks', () => {
    expect(validateModule({ modulePath })(mockModule)('yes')).toEqual('yes')
  })

  it('should call deprecationCheck, arrityCheck, typeCheck when passed associated validation options', () => {
    validateModule({
      modulePath,
      types: { param: 'string', type: 'string' },
    })(mockModule)('yes')
    expect(deprecationCheck).toHaveBeenCalled()
    expect(arrityCheck).toHaveBeenCalled()
    expect(typeCheck).toHaveBeenCalled()
    expect(customRule).not.toHaveBeenCalled()
  })

  it('should return the mixins return value when arrityCheck and typecheck passes', () => {
    expect(
      validateModule({
        modulePath,
        types: { param: 'string', type: 'string' },
      })(mockModule)('yes'),
    ).toEqual('yes')
  })

  it('should call deprecationCheck, arrityCheck, typeCheck, customRule when passed associated config options validation', () => {
    validateModule({
      modulePath,
      types: { param: 'string', type: 'string' },
      customRule: { enforce: true, msg: '1 equals 1' },
    })(mockModule)('yes')
    expect(deprecationCheck).toHaveBeenCalled()
    expect(arrityCheck).toHaveBeenCalled()
    expect(typeCheck).toHaveBeenCalled()
    expect(customRule).toHaveBeenCalled()
  })

  it('should return the mixins return value when all validation passes', () => {
    expect(
      validateModule({
        modulePath,
        types: { param: 'string', type: 'string' },
        customRule: { enforce: true, msg: '1 equals 1' },
      })(mockModule)('yes'),
    ).toEqual('yes')
  })

  // TODO: Failure Cases
})
