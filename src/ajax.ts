import { obj2formData } from './utils/transform'

function setHeaders(xhr, headerList) {
  for (let key in headerList) {
    xhr.setRequestHeader(key, headerList[key])
  }
}

function bindEvents(xhr, eventList) {
  Object.keys(eventList).forEach(event => {
    xhr.addEventListener(event, eventList[event])
  })
  if (typeof eventList.uploadProgress === 'function' && xhr.upload) {
    xhr.upload.addEventListener('progress', eventList.uploadProgress)
  }
}

function parseResponse(res) {
  if (typeof res === 'string' && res.length) {
    try {
      return JSON.parse(res)
    } catch (e) {
      return res
    }
  }
  return null
}

function createAjax({
  url,
  search,
  input,
  href,
  dataType,
  methods,
  async,
  withCredentials,
  header,
  timeout,
  xhrEvent
}) {
  const xhr = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    let data = dataType === 'json' ? search.slice(1) : obj2formData(input)
    xhr.withCredentials = withCredentials
    xhr.timeout = timeout
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(parseResponse(xhr.response))
        } else {
          reject(xhr)
        }
      }
    }
    if (methods === 'GET' || methods === 'DELETE' ) url = href
    xhr.open(methods, url, async)
    setHeaders(xhr, header)
    xhr.send(data)
    bindEvents(xhr, xhrEvent)

  })
}

export default createAjax
