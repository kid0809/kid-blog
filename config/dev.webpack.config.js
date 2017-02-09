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
    vendor: ['react', 'react-dom', 'react-router', 'redux'],
    css: './web/public/sass/main.scss',
    components: [
      'webpack-hot-middleware/client',
      './web/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../web/bundle'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/bundle/',
    sourceMapFilename: 'map/[file].map'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader?browsers=last 2 version'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },

  resolve: {
    extensions: ['.js', 'jsx']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      },
      'API_SERVER': JSON.stringify('http://localhost:8081')
    }),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      minimize: false,
      debug: true
    })
  ],
}
