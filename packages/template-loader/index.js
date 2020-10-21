const path = require('path')
const qs = require('querystring')
const { generate } = require('@wnext/generator-template')

module.exports = function(source) {
  const loaderContext = this
  const {
    rootContext,
    resourcePath,
    resourceQuery
  } = loaderContext

  
  const query = qs.parse(resourceQuery.slice(1))
  const sourceRoot = path.relative(rootContext, resourcePath)
  const buildPath = sourceRoot
    .replace(/^src/, '')
    .replace(/\.vue$/, '.wxml')

  if (query.type === 'template') {
    const template = generate(source)
    loaderContext.emitFile(buildPath, template)
  }

  return source
}