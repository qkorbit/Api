import Entity from './entity'

export interface GlobalObject {
  [key: string]: any
}

export interface AjaxEventList {
  loadstart?: () => any
  progress?: () => any
  error?: () => any
  load?: () => any
  timeout?: () => any
  loadend?: () => any
  readystatechange?: () => any
}

export interface EntityOption {
  namespace?: string
  domain?: string
  methods?: string
  callbackName?: string
  mock?: object
  header?: object
  async?: boolean
  debug?: boolean
  useMock?: boolean
  withCredentials?: boolean
  timeout?: number
  callbackId?: number
  input?: GlobalObject
  xhrEvent?: AjaxEventList
  filter?: ((n: GlobalObject) => GlobalObject)
  urlModel?: 0 | 1
  dataType?: 'json' | 'jsonp' | 'stream'
}

export interface DefineMock extends EntityOption {
  input?: GlobalObject
  mock?: object
}

export interface IEntity extends EntityOption {
  href: string
  search: string
  url: string
  send: () => Promise<object>
  mixins: (origin: EntityOption) => void
}

export interface EntityObject {
  [key: string]: Entity
}

export interface GlobalControl {
  define: (namespace: string, config: DefineMock) => void
  config: (config?: EntityOption) => void
  require: (namespace: string, data?: GlobalObject, config?: EntityOption) => Promise<object>
  get: (namespace: string) => Entity
}
