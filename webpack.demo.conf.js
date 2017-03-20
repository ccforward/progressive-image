var path = require('path')
var webpack = require('webpack')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    demo: './example/demo-vue.js'
  },
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: '[name].dist.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': resolve('src'),
    }
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
}