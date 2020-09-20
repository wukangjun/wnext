/**
 * onLoad((opts) => {})
 */
export type hookCallback = (opts?: any) => void

export const lifetimeMap: Map<string, Set<hookCallback>> = new Map()

function createLifetime(name: string) {
    return function lifetime(fn: hookCallback) {
        if (!lifetimeMap.has(name)) {
            lifetimeMap.set(name, new Set())
        }
        const lifetimeSet = lifetimeMap.get(name)
        lifetimeSet.add(fn)
    }
}

export const onLoad = createLifetime('onLoad')
export const onShow = createLifetime('onShow')

// export const lifetimes = ['onLoad', 'onShow', 'onReady', 'onPullDownRefresh']
