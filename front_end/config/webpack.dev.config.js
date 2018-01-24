const path = require('path');
const webpack = require('webpack');
const cssnext = require("postcss-cssnext");

module.exports = {
  entry: path.resolve(__dirname, '../js/app.js'),
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'app.bundle.js'
  },
  watch: true,
  watchOptions: {
    ignored: [/node_modules/, /api/]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [/node_modules/],
      query: {
        presets: ['es2015', 'react'],
        plugins: [
          'transform-async-to-generator',
          'transform-object-rest-spread'
        ]
      }
    },{
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 1,
            localIdentName: "[name]--[local]--[hash:base64:8]"
          }
        },{
          loader: "postcss-loader",
          options: {
            plugins() {
              return [ cssnext ];
            }
          }
        }
      ]
    }
  ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..'),
    hot: true
  }
};