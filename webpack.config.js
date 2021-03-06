
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      index06:'./examples/01/code01/src/index06.js'
    },
    mode: "development",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ],
    optimization: {
      splitChunks: {
          chunks: 'all'
      }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './examples/01/code01/dist')
    },
    module: {
        rules: [
          {
            test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
          }
        ]
    }
}