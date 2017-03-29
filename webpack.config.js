// var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
	devtool: 'source-map',
	devServer: {
		inline: true,
		// hot: true,
		contentBase: 'dist/',
		port: 80,
	},
	entry: path.resolve(APP_DIR, 'main.jsx'),
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					'presets': ['react', 'es2015', 'stage-3'], // , 'stage-3'
				},
			},
		],
	},
};

module.exports = config;
