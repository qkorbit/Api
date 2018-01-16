import { GlobalObject } from '../type'

export function obj2formData(obj: GlobalObject): FormData {
  let data = new FormData()
  Object.keys(obj).forEach(key => data.append(key, obj[key]))
  return data
}

export const copyProp = (o: object, t: object): void => Object.keys(o).forEach(e => t[e] = o[e])

export const Obj2QueryString = (o: GlobalObject): string => Object.keys(o).map(e => e + '=' + o[e]).join('&')
