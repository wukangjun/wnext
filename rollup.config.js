const rollup = require('rollup')
// js-> babel
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
// 解析外部库
// plugin-commonjs(es: export default ---> commonjs(module.exports))
// plugin-node-resove
const { nodResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')

// rollup写配置

// input
const inputOptions = {
    // 
}


// output


