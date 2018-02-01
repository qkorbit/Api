import createJsonp from '../src/jsonp'
jest.setTimeout(3000)
describe('createJsonp', () => {
  jest.useFakeTimers()
  let href = 'http://api.foo.com/jsonp/?name=qkorbit'
  it('test main', () => {
    let $head = document.getElementsByTagName('head')[0]
    let jsonp = createJsonp({
      href,
      timeout: 3000,
      callbackName: 'callback',
      callbackId: 'jsonp666'
    })
    let jsonp2 = createJsonp({
      href,
      timeout: 3000,
      callbackName: 'callback'
    })
    expect(Object.prototype.toString.call(jsonp)).toBe('[object Promise]')
    expect(!window['jsonp666']).toBeFalsy()
    let el = document.getElementById('jsonp666')
    expect(el.id).toBe('jsonp666')
    expect(el.tagName.toLocaleLowerCase()).toBe('script')
    expect(el.getAttribute('src')).toBe(`${href}&callback=jsonp666`)
    expect(el.parentNode).toBe($head)
    el.innerHTML = `
    jsonp666({
      "name": "qkorbit"
    })
    `
    window['jsonp666']({
      name: 'qkorbit'
    })
    jest.runAllTimers()
  })
  it('test timeout', () => {
    let json = createJsonp({
      href,
      timeout: 100,
      callbackName: 'callback',
      callbackId: 'jsonptimeout'
    })
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100)
    jest.runAllTimers()
  })
})
