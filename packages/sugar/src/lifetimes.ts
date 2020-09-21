type hookCallback = (opts?: any) => void

export const lifetimeMap: Map<string, Set<hookCallback>> = new Map()

/**
 * 追踪生命周期函数到集合
 * 
 * @param name
 */
function trackLifetime(name: string) {
  return function lifetime(fn: hookCallback) {
    if (!lifetimeMap.has(name)) {
      lifetimeMap.set(name, new Set())
    }
    const lifetimeSet = lifetimeMap.get(name)
    if (lifetimeSet) {
      lifetimeSet.add(fn)
    }
  }
}

export const onLoad = trackLifetime('onLoad')
export const onShow = trackLifetime('onShow')
