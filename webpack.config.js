const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const DEV = process.env.NODE_ENV==='development';
const ip = require('ip').address();
// const host = ip === '127.0.0.1' ? 'localhost': ip;
const host = 'localhost';

const config ={
  entry: './src',
  output:{
    path:'./public',
    filename: 'bundle.js'
  },
  devServer: {
    host: host,
    contentBase: 'public',
    historyApiFallback: {
      index: '/index.html'
    }
  },
  devtool: DEV ? 'cheap-module-source-map' : 'source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};

if(DEV){
  config.module.loaders[0].query.presets.push('react-hmre');
  config.plugins.push(
    new OpenBrowserPlugin({ url: `http://${host}:8080` })
  )
} else {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle: false,
      compressor: {
        drop_console: true,
        warnings: true
      }
    })
  );
}

module.exports = config;