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

describe('deprecationCheck', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should call only deprecationCheck to have been called when passed only module path', () => {
    validateModule(
      {
        modulePath,
      },
      mockModule,
      [{ css: 'yes ' }],
    )
    expect(deprecationCheck).toHaveBeenCalled()
    expect(arrityCheck).not.toHaveBeenCalled()
    expect(typeCheck).not.toHaveBeenCalled()
    expect(customRule).not.toHaveBeenCalled()
  })

  it('should return the mixins value when passed no validation checks', () => {
    expect(
      validateModule(
        {
          modulePath,
        },
        mockModule,
        [{ css: 'yes ' }],
      ),
    ).toEqual({ css: 'yes ' })
  })

  it('should call only deprecationCheck and arrityCheck when passed associated validation options', () => {
    validateModule(
      {
        modulePath,
        arrityCheck: { args: [1], max: 1 },
      },
      mockModule,
      [{ css: 'yes ' }],
    )
    expect(deprecationCheck).toHaveBeenCalled()
    expect(arrityCheck).toHaveBeenCalled()
    expect(typeCheck).not.toHaveBeenCalled()
    expect(customRule).not.toHaveBeenCalled()
  })

  it('should return the mixins return value when arrityCheck passes', () => {
    expect(
      validateModule(
        {
          modulePath,
          arrityCheck: { args: [1], max: 1 },
        },
        mockModule,
        [{ css: 'yes ' }],
      ),
    ).toEqual({ css: 'yes ' })
  })

  it('should call only deprecationCheck, arrityCheck, typeCheck when passed associated validation options', () => {
    validateModule(
      {
        modulePath,
        arrityCheck: { args: [1], max: 1 },
        typeCheck: { param: 'string', type: 'string' },
      },
      mockModule,
      [{ css: 'yes ' }],
    )
    expect(deprecationCheck).toHaveBeenCalled()
    expect(arrityCheck).toHaveBeenCalled()
    expect(typeCheck).toHaveBeenCalled()
    expect(customRule).not.toHaveBeenCalled()
  })

  it('should return the mixins return value when arrityCheck and typecheck passes', () => {
    expect(
      validateModule(
        {
          modulePath,
          arrityCheck: { args: [1], max: 1 },
          typeCheck: { param: 'string', type: 'string' },
        },
        mockModule,
        [{ css: 'yes ' }],
      ),
    ).toEqual({ css: 'yes ' })
  })

  it('should call deprecationCheck, arrityCheck, typeCheck, customRule when passed associated config options validation', () => {
    validateModule(
      {
        modulePath,
        arrityCheck: { args: [1], max: 1 },
        typeCheck: { param: 'string', type: 'string' },
        customRule: { enforce: true, msg: '1 equals 1' },
      },
      mockModule,
      [{ css: 'yes ' }],
    )
    expect(deprecationCheck).toHaveBeenCalled()
    expect(arrityCheck).toHaveBeenCalled()
    expect(typeCheck).toHaveBeenCalled()
    expect(customRule).toHaveBeenCalled()
  })

  it('should return the mixins return value when all validation passes', () => {
    expect(
      validateModule(
        {
          modulePath,
          arrityCheck: { args: [1], max: 1 },
          typeCheck: { param: 'string', type: 'string' },
          customRule: { enforce: true, msg: '1 equals 1' },
        },
        mockModule,
        [{ css: 'yes ' }],
      ),
    ).toEqual({ css: 'yes ' })
  })

  // TODO: Failure Cases
})
