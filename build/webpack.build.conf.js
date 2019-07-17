const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')('production')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production'
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
