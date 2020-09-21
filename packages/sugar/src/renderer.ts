import { ComponentOptions, setupComponent, ComponentInternalInstance } from './component'


export function createApp(options: ComponentOptions) {
  const instance: ComponentInternalInstance = {
    type: options
  }
  setupComponent(instance)
}