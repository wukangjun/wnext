import { compile, RenderFunction } from 'vue'
import { effect, ReactiveEffect } from "@vue/reactivity"

function NOOP() {}


export interface ComponentOptions {
  template?: string
  setup: (P: {}) => void
  render?: RenderFunction

  methods?: Record<string, unknown>
}

export interface ComponentExternalProperties {
  type: ComponentOptions
  render?: RenderFunction,
  update?: ReactiveEffect
}

export type ComponentInternalInstance = ComponentExternalProperties

export function setupComponent(instance: ComponentInternalInstance) {
  finishComponentSetup(instance)
  setupRenderEffect(instance)
}

function finishComponentSetup(instance: ComponentInternalInstance) {
  const component = instance.type

  if (!instance.render && component.template) {
    component.render = compile(component.template)
  }
  instance.render = (component.render || NOOP)
}

function setupRenderEffect(instance: ComponentInternalInstance) {
  instance.update = effect(() => {
    if (instance && instance.render) {
      const a = instance.render
      console.log(a)
    }
  })
}