import { isReactive, isRef } from "@vue/reactivity";
import { ComponentInnerInstance } from "./component";
import { baseObjectDefinePropertyGetOptions, baseObjectDefinePropertyOptions, extend } from "./shared/utils";

/**
 * 和Component的属性融合
 * 
 * 响应式数据合并到小程序组件实例的data属性
 * 其他属性合并到实例上
 */
export function attachToProperties(instance: ComponentInnerInstance) {
  const { setupResult, setupState, wxInstance } = instance
  // 区分是数据还是方法
  // 数据依附到data属性, 其他的依附到组件实例上
  if (setupResult) {
    Object.keys(setupResult).forEach(key => {
      const value = Reflect.get(setupResult, key)
      if (isReactive(value) || isRef(value)) {
        Object.defineProperty(wxInstance.data, key, extend({}, baseObjectDefinePropertyGetOptions, {
          get: () => Reflect.get(setupState, key)
        }))
      } else {
        Object.defineProperty(wxInstance, key, extend({}, baseObjectDefinePropertyOptions, {
          value
        }))
      }
    })
  }
}