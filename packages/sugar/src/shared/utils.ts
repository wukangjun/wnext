
export const Noop = function() {}

export const baseObjectDefinePropertyOptions: PropertyDescriptor = {
  enumerable: true,
  //configurable: true
  value: Noop
}
export const baseObjectDefinePropertyGetOptions: PropertyDescriptor = {
  enumerable: true,
  configurable: true,
  get: Noop,
  set: Noop
}

export const toString = Object.prototype.toString
export const extend = Object.assign
export const EMPTY_OBJ: { readonly [key: string]: any } = {}

export function isPromise(val: any) {
  return val && typeof val.then === 'function' && typeof val.catch === 'function'
}

export const isObject = (val: any) => val !== null && typeof val === 'object'
export const isFunction = (val: any) => val!== null && typeof val === 'function' 