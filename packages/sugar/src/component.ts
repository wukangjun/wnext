import { compile, RenderFunction } from 'vue'
import { effect, ReactiveEffect } from "@vue/reactivity"
import { isFunction, isObject, isPromise, Noop } from './shared/utils'

type SyncSetupResult = Record<string, any>
type AsyncSetupResult = Promise<SyncSetupResult>
type SetupResult = SyncSetupResult | AsyncSetupResult
type SetupCallback = (p?: any) => SetupResult

export interface ComponentOptions {
  template?: string
  setup?: SetupCallback
  render?: RenderFunction
  methods?: Record<string, unknown>
}

export interface ComponentExternalProperties extends wx.Component<any, any, any> {
  type: ComponentOptions
  render?: RenderFunction
  update?: ReactiveEffect
  asyncDep?: SetupResult
  setupState: ProxyHandler<any>
}

function callWithErrorHandling(fn: SetupCallback, props: any) {
  let res
  try {
    res = props ? fn(props) : fn()
  } catch (error) {
    throw new Error(error)
  }
  return res
}

function handleSetupResult(instance: ComponentExternalProperties, setupResult: SyncSetupResult) {
  if (isFunction(setupResult)) {
    // TODO: 暂时不支持setup返回render方法
  } else if (isObject(setupResult)) {
    //instance.setupState = 
  }
}

export function setupComponent(instance: ComponentExternalProperties) {
  const Component = instance.type
  const { setup } = Component

  if (setup) {
    const setupResult = callWithErrorHandling(setup, instance.properties)
    if (isPromise(setupResult)) {
      instance.asyncDep = setupResult
    } else {

    }
  }
  finishComponentSetup(instance)
  setupRenderEffect(instance)
}

function finishComponentSetup(instance: ComponentExternalProperties) {
  const component = instance.type
  if (!component.render) {
    throw new Error('render option is must be exist!')
  }
  instance.render = (component.render || Noop)
}

function setupRenderEffect(instance: ComponentExternalProperties) {
  instance.update = effect(() => {
    if (instance && instance.render) {
      const a = instance.render
      console.log(a)
    }
  })
}