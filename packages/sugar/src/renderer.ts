import { ComponentOptions, ComponentExternalProperties, setupComponent } from './component'
import { baseObjectDefinePropertyOptions, extend } from './shared/utils'


export function createApp(options: ComponentOptions) {  
  options.methods = options.methods || {}
  Object.defineProperty(options.methods, 'onLoad', extend({}, baseObjectDefinePropertyOptions, {
    value: function() {
      const instance = this as unknown as ComponentExternalProperties
      instance.type = options
      setupComponent(instance)
    }
  }))
}