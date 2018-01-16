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

function createAjax({
  url,
  search,
  input,
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
    xhr.open(methods, url, async)
    setHeaders(xhr, header)
    xhr.send(data)
    bindEvents(xhr, xhrEvent)

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let rep = xhr.response
          if (typeof rep !== 'object') {
            rep = JSON.parse(rep)
          }
          resolve(rep)
        } else {
          reject(xhr)
        }
      }
    }
  })
}

export default createAjax
