import { mountComponent, WxComponentInstance, ComponentOptions } from './component'
import { extend, baseObjectDefinePropertyOptions } from './shared/utils'

export * from './lifetimes'

export function createApp(options: ComponentOptions) {  
  options.methods = options.methods || {}
  Object.defineProperty(options.methods, 'onLoad', extend({}, baseObjectDefinePropertyOptions, {
    value: function() {
      const instance = this as unknown as WxComponentInstance
      mountComponent(instance, options)
      console.log(this)
    }
  }))

  return Component(options)
}