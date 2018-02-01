import { REGEXP_URL, DEFAULT_OPTIONS } from '../src/constant'

describe('REGEXP_URL', () => {
  it('should return true', () => {
    expect(REGEXP_URL.test('http://localhost')).toBe(true)
    expect(REGEXP_URL.test('http://127.0.0.1')).toBe(true)
    expect(REGEXP_URL.test('http://127.0.0.1:8080')).toBe(true)
    expect(REGEXP_URL.test('https://github.com')).toBe(true)
  })
})

describe('DEFAULT_OPTIONS', () => {
  it('should be objcet', () => {
    expect(Object.prototype.toString.call(DEFAULT_OPTIONS) === '[object Object]').toBe(true)
  })
  it('should be yourself', () => {
    expect(DEFAULT_OPTIONS.filter({
      id: 666
    })).toEqual({
      id: 666
    })
  })
})
