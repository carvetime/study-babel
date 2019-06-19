
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './examples/01/code01/src/index05.js',
    mode: "development",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ],
    output: {
        filename: 'bundle.js',
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