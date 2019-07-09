require('dotenv').config()

const path = require('path')
const fs = require('fs')
const webpack =  require('webpack')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Main const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
}

module.exports = {
  // BASE config
  externals: {
    paths: PATHS,
    jquery: 'jQuery'
  },
  entry: {
    loader: PATHS.src,
  },
  output: {
    filename: '[name].[hash].js',
    path: PATHS.dist,
    publicPath: '/'
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendors',
  //         test: /node_modules/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  module: {
    rules: [ {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
            pretty: true
        }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'base64-inline-loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.sass$/,
      use: [
        'style-loader',
        //MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        //MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }]
  },
  resolve: {
    alias: {
      '~': PATHS.src,
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      'window.jquery': 'jquery'
    })
  ]
}
