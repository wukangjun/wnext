module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/packages'],
  testPathIgnorePatterns: [
    'node_modules'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testMath: ['<rootDir>/packages/**/__tests__/**/*test.[jt]s?(x)'],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname')
  ]
}