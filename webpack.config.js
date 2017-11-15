const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const PurifyCssPlugin = require('purifycss-webpack');

module.exports = {
  entry: {
    app: './src/entry.js'
  },
  output: {
    // output 目录对应一个绝对路径。
    path: path.resolve(__dirname, 'dist'), // path.resolve方法会把一个路径或路径片段的序列解析为一个绝对路径
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        // 分离css
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100
          }
        }]
      }, {
        test: /\.scss$/,
        // use: ['style-loader', 'css-loader', 'sass-loader']
        // 分离scss
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      }, {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
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
    }),
    new ExtractTextPlugin('css/style.css'),
    new PurifyCssPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html'))
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    host: 'localhost',
    compress: true,
    port: 8080
  },
  // devtool: 'source-map',
}

// console.log(__dirname) => /Users/jina194/Desktop/webpack_demo
// console.log(path.resolve(__dirname, 'dist')) => /Users/jina194/Desktop/webpack_demo/dist
// console.log(path.resolve(__dirname, './dist')) => /Users/jina194/Desktop/webpack_demo/dist