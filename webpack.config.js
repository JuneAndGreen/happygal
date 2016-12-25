'use strict';

const path = require('path');

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
  	path: path.join(__dirname, './dist/'),
    filename: 'main.js'
  },
  module: {
	  loaders: [
	    {test: /\.js$/, loader: 'babel', query: {presets: 'es2015'}},
      {test: /\.less$/, loaders: ['style', 'css', 'less']},
      {test: /\.(png|jpg)$/, loader: 'url', query: {limit: 1024, name: '[hash].[ext]'}},
      {test: /\.html$/, loader: 'raw', exclude: /main/}
	  ]
	},
  resolve: {
    extensions: ['', '.js']
  }
};