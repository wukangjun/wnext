import path, { resolve } from 'path'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolvePackage = p => path.resolve(packageDir, p)
const pkg = require(resolve(resolvePackage('package.json')))
const packageOptions = pkg.buildOptions || {}

const outputOptions = {
  file: resolvePackage('dist/index.js'),
  format: 'cjs'
}

function createOptions(output) {
  const isGlobal = packageOptions.global
  const tsPlugin = ts({
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    //cacheRoot: path.resolve(__dirname, 'node_modules/.rts_cache'),
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        declarationDir: resolvePackage('types')
      },
      include: ['packages/**/src', 'packages/**/types'],
      exclude: ['**/__tests__', '**/examples']
    }
  })

  if (isGlobal) {
    output.name = packageOptions.name
  }

  const external = isGlobal
    ? []
    : [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]

  const resolve = isGlobal
    ? [
      nodeResolve(),
      commonjs()
    ]
    : []

  return {
    input: resolvePackage('src/index.ts'),
    plugins: [
      json(),
      external,
      ...resolve,
      tsPlugin
    ],
    output
  }
}

export default createOptions(outputOptions)
