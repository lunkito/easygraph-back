const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './backend/server.ts',
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      { test: /\.ts?$/, use: 'ts-loader', exclude: /node_modules\// }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  devServer: {
    historyApiFallback: true
  }
};
