import { obj2formData, copyProp, Obj2QueryString, queryStringMark } from '../../src/utils/transform'

describe('obj2formData', () => {
  it('test obj2formData', () => {
    let fd = obj2formData({
      name: 'qkorbit',
      from: 'china'
    })
    expect(fd.get('name') === 'qkorbit')
    expect(fd.get('from') === 'china')
    expect(Object.prototype.toString.call(fd) === '[object FormData]').toBeTruthy()
  })
})

describe('copyProp', () => {
  it('test copyProp', () => {
    let A = {
      a: true
    }
    let B = {
      b: true
    }
    copyProp(A, B)
    expect('a' in B).toBeTruthy()
  })
})

describe('Obj2QueryString', () => {
  it('test Obj2QueryString', () => {
    let obj = {
      name: 'qkorbit',
      from: 'china'
    }
    expect(Obj2QueryString(obj)).toBe('name=qkorbit&from=china')
    expect(Obj2QueryString({})).toBe('')
    expect(Obj2QueryString({
      cd: 666
    })).toBe('cd=666')
  })
})

describe('queryStringMark', () => {
  it('should return suitable mark', () => {
    expect(queryStringMark('https://github.com?id=123')).toBe('&')
    expect(queryStringMark('https://github.com')).toBe('?')
  })
})
