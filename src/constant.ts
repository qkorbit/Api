import { EntityOption } from './type'

// https://github.com/axios/axios/blob/master/lib/helpers/isAbsoluteURL.js
export const REGEXP_URL = /^([a-z][a-z\d\+\-\.]*:)?\/\//i

export const DEFAULT_OPTIONS: EntityOption = {
  domain: window.location.href,
  methods: 'GET',
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
