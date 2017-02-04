const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './source/client.js',
	output: {
		filename: 'app.js',
		path: './build/statics'
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					plugins: ['transform-es2015-modules-commonjs']
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules')
			}
		]
	},
	target: 'web',
	plugins: [
		new ExtractTextPlugin('../statics/style.css')
	]
};
