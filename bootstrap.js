require('dotenv').config()
const tsconfigPaths = require('tsconfig-paths')
const config = require('./tsconfig.json')

const isProd = process.env.NODE_ENV === 'production'
const baseUrl = isProd ? './dist' : './src'
process.env.isDev = !isProd

tsconfigPaths.register({
  baseUrl: baseUrl,
  paths: config.compilerOptions.paths,
})
