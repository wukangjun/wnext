const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))
const target = (args._)[0]

execa(
  'rollup',
  [
    '-wc',
    '--environment',
    [
      `TARGET:${target}`
    ].join(',')
  ],
  {
    stdio: 'inherit'
  }
)