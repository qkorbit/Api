import createAjax from '../src/ajax'
const sinon = require('sinon')
jest.setTimeout(3000)
describe('createAjax', () => {
  let entity
  let data = { foo: 'bar' }
  let dataJson = JSON.stringify(data)
  beforeEach(() => {
    window['XMLHttpRequest'] = sinon.useFakeXMLHttpRequest()
    window['XMLHttpRequest'].onCreate = xhr => {
      entity = xhr
    }
  })
  let rc = {
    url: 'http://localhost:3000/get-success',
    search: '',
    input: {},
    dataType: 'json',
    methods: 'GET',
    async: false,
    withCredentials: false,
    header: {
      'Content-Type': 'application/json'
    },
    timeout: 3000,
    xhrEvent: {
      load(e) {
        expect(e.target.response).toBe(dataJson)
      },
      uploadProgress(e) {
        expect(e.target).toBeTruthy()
      }
    }
  }
  it('test GET', done => {
    let get = createAjax({
      ...rc
    })
    expect(Object.prototype.toString.call(get)).toBe('[object Promise]')
    entity.respond(200, { 'Content-Type': 'application/json' }, dataJson)
    get.then(res => {
      done()
    })
    expect(true).toBeTruthy()
  })
  it('test error', done => {
    createAjax({
      ...rc,
      xhrEvent: {}
    })
    entity.error()
    done()
  })
  it('test other', done => {
    createAjax({
      ...rc,
      xhrEvent: {},
      dataType: 'stream',
      methods: 'POST',
      withCredentials: true
    }).then(() => {
      done()
    })
    entity.respond(200, { 'Content-Type': 'application/json' }, '')
  })
  it('test abnormal', done => {
    createAjax({
      ...rc,
      xhrEvent: {}
    }).then(() => {
      done()
    })
    window['JSON'].parse = null
    entity.respond(200, { 'Content-Type': 'application/json' }, dataJson)
  })
})
