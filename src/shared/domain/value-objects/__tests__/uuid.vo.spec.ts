import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as UuidValidate } from 'uuid'


describe('Uuid Unit Tests', () => {

  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')

  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid('invalid-uuid')
    }).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled()
  })
  
  test('should create a valid uuid', () => {
    const uuid = new Uuid()
    expect(uuid.id).toBeDefined()
    expect(UuidValidate(uuid.id)).toBe(true)
  })
  
  test('should accept a valid uuid', () => {
    const uuid = new Uuid('f7f3b3e3-7b3e-4e3e-8e3e-3e3e3e3e3e3e')
    expect(uuid.id).toBe('f7f3b3e3-7b3e-4e3e-8e3e-3e3e3e3e3e3e')
  })
});