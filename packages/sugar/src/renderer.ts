import { effect } from '@vue/reactivity'
import { ComponentInnerInstance } from './component'
import { EMPTY_OBJ, Noop } from './shared/utils'

type PublicPropertiesMap = Record<string, any>

// 兼容vue2.0的属性和方法
const publicPropertiesMap: PublicPropertiesMap = {
  $createElement: Noop,
  _e: Noop,
  _self: EMPTY_OBJ,
  _s: Noop,
  _v: Noop
}

/**
 * 添加公用方法
 * 
 * @param instance 
 */
export function createRenderContext(instance: ComponentInnerInstance) {
  const target: Record<string, any> = {}

  Object.keys(publicPropertiesMap).forEach(key => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      get: () => publicPropertiesMap[key],
      set: Noop
    })
  })

  return target
}

export function setupRenderEffect(instance: ComponentInnerInstance) {
  const { wxInstance } = instance
  instance.update = effect(() => {
    if (instance && instance.render) {
      const subTree = instance.render.call(instance.ctx)
      wxInstance.setData(wxInstance.data)
    }
  })
}