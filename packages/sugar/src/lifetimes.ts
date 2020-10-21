import { track } from "@vue/reactivity"

type hookCallback = (opts?: any) => void

const lifetimeMap: Map<string, Set<hookCallback>> = new Map()

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
export const onReady = trackLifetime('onReady')
export const onUnload = trackLifetime('onUnload')

export const onShow = trackLifetime('onShow')
export const onHide = trackLifetime('onHide')

export const onShareAppMessage = trackLifetime('onShareAppMessage')
export const onShareTimeline = trackLifetime('onShareTimeline')

export const onPullDownRefresh = trackLifetime('onPullDownRefresh')
export const onReachBottom = trackLifetime('onReachBottom')
export const onPageScroll = trackLifetime('onPageScroll')
export const onResize = trackLifetime('onResize')
export const onTabItemTap = trackLifetime('onTabItemTap')
