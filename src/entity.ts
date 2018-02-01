import { copyProp, Obj2QueryString, queryStringMark } from './utils/transform'
import { log } from './utils/console'
import createJsonp from './jsonp'
import ajax from './ajax'
import { REGEXP_URL } from './constant'
import { IEntity } from './type'

export default class Entity implements IEntity {
  domain
  methods
  dataType
  callbackName
  mock
  input
  header
  xhrEvent
  async
  debug
  useMock
  withCredentials
  timeout
  urlModel
  callbackId
  filter
  namespace
  constructor(arg) {
    this.mixins(arg)
  }
  mixins(origin) {
    copyProp(origin, this)
  }
  get href() {
    return this.url + this.search
  }
  get search() {
    return queryStringMark(this.url) + Obj2QueryString(this.filter(this.input))
  }
  get url() {
    let { urlModel, domain, namespace } = this
    if (urlModel === 1) {
      return domain
    } else {
      return REGEXP_URL.test(namespace) ? namespace : domain + namespace
    }
  }
  send() {
    if (this.debug) log(`${this.namespace}`, this.input)
    if (this.useMock) {
      return Promise.resolve(this.mock)
    } else if (this.dataType === 'jsonp') {
      return createJsonp(this)
    } else {
      return ajax(this)
    }
  }
}
