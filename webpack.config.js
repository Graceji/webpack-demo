const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/entry.js'
  },
  output: {
    // output 目录对应一个绝对路径。
    path: path.resolve(__dirname, 'dist'), // path.resolve方法会把一个路径或路径片段的序列解析为一个绝对路径
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new uglify(),
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
      hash: true,
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    host: 'localhost',
    compress: true,
    port: 8080
  }
}

// console.log(__dirname) => /Users/jina194/Desktop/webpack_demo
// console.log(path.resolve(__dirname, 'dist')) => /Users/jina194/Desktop/webpack_demo/dist
// console.log(path.resolve(__dirname, './dist')) => /Users/jina194/Desktop/webpack_demo/dist