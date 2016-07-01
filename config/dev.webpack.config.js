var path         = require('path');
var webpack      = require('webpack');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  context: path.resolve(__dirname, '..'),
  node: {
    __dirname: true
  },
  entry: {
    vendor: ['react', 'react-router', 'redux'],
    css: ['./web/public/sass/main.scss'],
    compoments: [
      'webpack-hot-middleware/client',
      './web/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../web/bundle'),
    filename: '[name].js',
    publicPath: '/bundle/',
    sourceMapFilename: 'map/[file].map'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      },
      'API_SERVER': JSON.stringify('http://localhost:8081')
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?browsers=last 2 version'
      },

      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
    ]
  },
  postcss: function () {
      return [precss, autoprefixer];
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
