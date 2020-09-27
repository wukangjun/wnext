const loaderUtils = require('loader-utils')
const normalizerPath = require.resolve('@wnext/sugar')

module.exports = function(source) {
  const loaderContext = this
  const stringifyRequest = r => loaderUtils.stringifyRequest(loaderContext, r)

  const {
    resourceQuery
  } = loaderContext

  if (resourceQuery.length === 0) {
    source = `
      import { createApp } from ${stringifyRequest(`!${normalizerPath}`)}
      ${source}
    `
    source = source.replace(/component.exports/, 'createApp(component.exports)')
  }

  return source
}