/* eslint-env node */
import * as path from 'path';

import webpack from 'webpack';
import SystemBellPlugin from 'system-bell-webpack-plugin';

const ROOT_PATH = __dirname;
const config = {
  paths: {
    dist: path.join(ROOT_PATH, 'dist'),
    src: path.join(ROOT_PATH, 'src'),
  }
};

module.exports = {
  devtool: 'source-map',
  output: {
    path: config.paths.dist,
    filename: 'index.js'
  },
  entry: config.paths.src,
  externals: {
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: config.paths.src
      }
    ]
  },
  plugins: [
    new SystemBellPlugin()
  ]
};
