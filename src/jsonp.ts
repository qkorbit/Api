import { error } from './utils/console'
const $head = document.getElementsByTagName('head')[0]

function generateCallbackID() {
  return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`
}

function clearJsonp(id) {
  window[id] = undefined
}

function removeScript(id) {
  $head.removeChild(document.getElementById(id))
}

function injectScript(id, src) {
  const script = document.createElement('script')
  script.id = id
  script.setAttribute('src', src)
  $head.appendChild(script)
}

/**
 * Create jsonp
 *
 * @param href The link
 * @param timeout The timeout
 * @param callbackName The jsonp callback name, append to href
 * @param callbackId The jsonp callback ID
 * @returns a Promise which should include response
 */
function createJsonp({ href, timeout, callbackName, callbackId }) {
  let id = callbackId || generateCallbackID()
  let mark = /\?/.test(href) ? '&' : '?'
  let src = `${href}${mark}${callbackName}=${id}`

  return new Promise((resolve, reject) => {
    let timeoutId = setTimeout(() => {
      error(`JSONP request to ${src} timed out`)
      reject(src)
      clearJsonp(id)
      removeScript(id)
    }, timeout)

    window[id] = res => {
      resolve(res)
      if (timeoutId) clearTimeout(timeoutId)
      clearJsonp(id)
      removeScript(id)
    }

    injectScript(id, src)
  })
}

export default createJsonp
