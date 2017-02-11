const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const clientConfig = {
  entry: './source/client.jsx',
  output: {
    filename: 'app.js',
    path: './build/statics',
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://dboscan-react-ss.now.sh'
      : 'http://localhost:3001/',
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
        query: {
          presets: ['latest-minimal', 'react'],
          plugins: ['transform-es2015-modules-commonjs'],
          env: {
            production: {
              plugins: ['transform-regenerator', 'transform-runtime'],
              presets: ['es2015'],
            },
            development: {
              plugins: ['transform-es2015-modules-commonjs'],
            },
          },
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules'),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.json'],
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin('../statics/style.css'),
  ],
};

if (process.env.NODE_ENV === 'production') {
  clientConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require'],
      },
    })
  );
}

module.exports = clientConfig;
