const path = require('path');

module.exports = {
  mode: 'production',
  entry: './backend/server.ts',
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js']
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
