const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './source/server.jsx',
  output: {
    filename: 'index.js',
    path: './build/server',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules'),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.json', '.html'],
  },
  target: 'node',
  plugins: [
    new ExtractTextPlugin('../statics/style.css'),
  ],
};
