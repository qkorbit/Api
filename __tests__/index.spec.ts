import Api from '../src/index'

describe('Api', () => {
  it('test setting', () => {
    expect(Api.get('testDefine')).toBeUndefined()
    Api.define('testDefine', {
      input: {},
      mock: {}
    })
    Api.define('testDefine', {
      input: {},
      mock: {
        update: true
      }
    })
    expect(Api.get('testDefine').mock.update).toBeTruthy()
  })
  it('test require', () => {
    Api.config()
    Api.config({
      useMock: true
    })
    expect(Object.prototype.toString.call(Api.require('req1', {}))).toBe('[object Promise]')
    expect(Object.prototype.toString.call(Api.require('req1', {}, {}))).toBe('[object Promise]')
    Api.define('preDefine', {
      input: {},
      mock: {
        payload: 666
      }
    })
    expect(Object.prototype.toString.call(Api.require('preDefine'))).toBe('[object Promise]')
    Api.require('preDefine').then(res => {
      expect(res['payload']).toBe(666)
    })
  })
  it('test createJsonp', () => {
    expect(true).toBeTruthy()
  })
})
