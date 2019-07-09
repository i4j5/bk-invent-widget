const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: '[name].[hash].css',
  //     path: `${baseWebpackConfig.externals.paths.dist}`,
  //   })
  // ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
