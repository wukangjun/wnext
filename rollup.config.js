import path, { resolve } from 'path'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolvePackage = p => path.resolve(packageDir, p)
const pkg = require(resolve(resolvePackage('package.json')))

const outputOptions = {
  file: resolvePackage('dist/index.js'),
  format: 'cjs'
}

function createOptions(output) {
  const tsPlugin = ts({
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts_cache'),
    tsconfigOverride: {
      compilerOptions: {
        declaration: true
      },
      exclude: ['**/__tests__', '**/examples']
    }
  })
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]

  return {
    input: resolvePackage('src/index.ts'),
    external,
    plugins: [
      json(),
      tsPlugin
    ],
    output
  }
}

export default createOptions(outputOptions)
