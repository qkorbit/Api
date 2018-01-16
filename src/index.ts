import { warn } from './utils/console'
import { copyProp } from './utils/transform'
import Entity from './entity'
import { DEFAULT_OPTIONS } from './constant'
import { EntityOption, GlobalControl, EntityObject } from './type'

const SET: EntityObject = {}
const COMMON: EntityOption = {}
const Api: GlobalControl = {
  define(namespace, config = {}) {
    if (SET[namespace]) warn(`redefine ${namespace}`)
    SET[namespace] = new Entity(config)
  },
  config(config = {}) {
    copyProp(config, COMMON)
  },
  require(namespace, data = {}, config = {}) {
    if (!SET[namespace]) this.define(namespace)
    let entity = SET[namespace]
    entity.mixins({
      ...DEFAULT_OPTIONS,
      ...COMMON,
      ...entity,
      ...config,
      namespace,
      input: data
    })
    return entity.send()
  },
  get(namespace) {
    return SET[namespace]
  }
}

export default Api
