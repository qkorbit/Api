import Entity from '../src/entity'

describe('Entity', () => {
  let config = {
    domain: 'http://foo.com/',
    dataType: 'json',
    timeout: 10000,
    useMock: false,
    input: {},
    mock: {},
    callbackName: 'callback',
    callbackId: 0,
    withCredentials: false,
    urlModel: 0,
    debug: false,
    async: true,
    filter: n => n,
    header: {},
    xhrEvent: {}
  }
  let GET = new Entity({
    ...config,
    namespace: 'testGET',
    methods: 'GET',
    input: {
      name: 'qkorbit',
      from: 'china'
    }
  })
  let POST = new Entity({
    ...config,
    namespace: 'testPOST',
    methods: 'POST',
    input: {
      name: 'qkorbit',
      from: 'china'
    }
  })
  let JSONP = new Entity({
    ...config,
    namespace: 'testJSONP',
    dataType: 'jsonp',
    input: {
      name: 'qkorbit',
      from: 'china'
    }
  })
  it('test mixins', () => {
    expect(POST.withCredentials === false).toBeTruthy()
    POST.mixins({
      withCredentials: true
    })
    expect(POST.withCredentials === true).toBeTruthy()
  })
  it('test getter url, search, href', () => {
    expect(GET.url).toBe('http://foo.com/testGET')
    GET.mixins({
      namespace: 'http://foo.com/testGET'
    })
    expect(GET.url).toBe('http://foo.com/testGET')
    GET.mixins({
      urlModel: 1
    })
    expect(GET.url).toBe('http://foo.com/')
    expect(GET.search).toBe('?name=qkorbit&from=china')
    expect(GET.href).toBe('http://foo.com/?name=qkorbit&from=china')
  })
  it('test send', () => {
    expect(Object.prototype.toString.call(GET.send())).toBe('[object Promise]')
    expect(Object.prototype.toString.call(POST.send())).toBe('[object Promise]')
    expect(Object.prototype.toString.call(JSONP.send())).toBe('[object Promise]')
  })
  it('test mock', () => {
    GET.mixins({
      useMock: true,
      debug: true
    })
    expect(Object.prototype.toString.call(GET.send())).toBe('[object Promise]')
  })
})
