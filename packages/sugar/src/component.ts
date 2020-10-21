import { RenderFunction } from 'vue'
import { proxyRefs, ReactiveEffect, ShallowUnwrapRef, toRaw } from "@vue/reactivity"
import { EMPTY_OBJ, isFunction, isObject, isPromise, Noop } from './shared/utils'
import { createRenderContext, setupRenderEffect } from './renderer'
import { attachToProperties } from './attachComponentProperties'

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

export interface ComponentInnerInstance {
  uid: number
  type: ComponentOptions
  render: RenderFunction | null
  update: ReactiveEffect | null
  asyncDep: SetupResult | null
  setupResult: SetupResult | null
  setupState: ShallowUnwrapRef<any>
  ctx: Record<string, any>
  props: Record<string, any>
  wxInstance: WxComponentInstance
}

export type WxComponentInstance = wx.Component<any, any, any>

function callWithErrorHandling(fn: SetupCallback, props: any) {
  let res
  try {
    res = props ? fn(props) : fn()
  } catch (error) {
    throw new Error(error)
  }
  return res
}

function exposeSetupStateOnRenderContext(instance: ComponentInnerInstance) {
  const { ctx, setupState } = instance
  Object.keys(toRaw(setupState)).forEach(key => {
    Object.defineProperty(ctx, key, {
      enumerable: true,
      configurable: true,
      get: () => setupState[key],
      set: Noop
    })
  })
}

function handleSetupResult(instance: ComponentInnerInstance, setupResult: SyncSetupResult) {
  if (isFunction(setupResult)) {
    // TODO: 暂时不支持setup返回render方法
  } else if (isObject(setupResult)) {
    instance.setupResult = setupResult
    instance.setupState = proxyRefs(setupResult)
  }
  exposeSetupStateOnRenderContext(instance)
  finishComponentSetup(instance)
}

let uid = 0
export function createComponentInstance(wxInstance: WxComponentInstance, options: ComponentOptions): ComponentInnerInstance {
  const instance: ComponentInnerInstance = {
    uid: uid++,
    type: options,
    render: null,
    update: null,
    asyncDep: null,
    setupResult: null,
    setupState: EMPTY_OBJ,
    ctx: EMPTY_OBJ,
    props: EMPTY_OBJ,
    wxInstance
  }

  instance.ctx = createRenderContext(instance)
  return instance
}

function setupComponent(instance: ComponentInnerInstance) {
  const Component = instance.type
  const { setup } = Component

  if (setup) {
    const setupResult = callWithErrorHandling(setup, instance.props)
    if (isPromise(setupResult)) {
      instance.asyncDep = setupResult
    } else {
      handleSetupResult(instance, setupResult)
    }
  }
  setupRenderEffect(instance)
}

function finishComponentSetup(instance: ComponentInnerInstance) {
  const component = instance.type
  if (!component.render) {
    throw new Error('render option is must be exist!')
  }
  instance.render = (component.render || Noop)
  attachToProperties(instance)
}



export function mountComponent(wxInstance: WxComponentInstance, options: ComponentOptions) {
  const instance = createComponentInstance(wxInstance, options)
  setupComponent(instance)
}