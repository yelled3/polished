// @flow
import validateModule from '../_validateModule'

jest.mock('../_arrityCheck', () => jest.fn(() => true))

const arrityCheck = require('../_arrityCheck')

jest.mock('../_customRule', () => jest.fn(() => true))

const customRule = require('../_customRule')

jest.mock('../_deprecationCheck', () => jest.fn(() => true))

const deprecationCheck = require('../_deprecationCheck')

jest.mock('../_typeCheck', () => jest.fn(() => false))

const typeCheck = require('../_typeCheck')

const modulePath = 'module/moduleName.js'

describe('deprecationCheck', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should call deprecationCheck when no additional configuration is passed', () => {
    validateModule(modulePath)
    expect(deprecationCheck).toHaveBeenCalled()
  })

  it('should return true when not passed a validation config', () => {
    expect(validateModule(modulePath)).toBeTruthy()
  })

  it('should call deprecationCheck and arrityCheck when passed arrity validation', () => {
    validateModule(modulePath, arrityCheck({ args: [2], max: 1 }))
    expect(deprecationCheck).toHaveBeenCalled()
    expect(arrityCheck).toHaveBeenCalled()
  })

  it('should call deprecationCheck, arrityCheck, typeCheck when passed arrity and type validation', () => {
    validateModule(modulePath, {
      arrityCheck: { args: [1], max: 1 },
      typeCheck: { param: 'string', type: 'string' },
    })
    expect(deprecationCheck).toHaveBeenCalled()
    expect(arrityCheck).toHaveBeenCalled()
    expect(typeCheck).toHaveBeenCalled()
  })

  it('should call deprecationCheck, arrityCheck, typeCheck, customRule when passed arrity, type, and custom validation', () => {
    validateModule(modulePath, {
      arrityCheck: { args: [1], max: 1 },
      typeCheck: { param: 'string', type: 'string' },
      // eslint-disable-next-line no-self-compare
      customRule: { enforce: 1 === 1, msg: '1 equals 1' },
    })
    expect(deprecationCheck).toHaveBeenCalled()
    expect(arrityCheck).toHaveBeenCalled()
    expect(typeCheck).toHaveBeenCalled()
    expect(customRule).toHaveBeenCalled()
  })
})
