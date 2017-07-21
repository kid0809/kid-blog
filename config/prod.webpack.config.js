var path         = require('path');
var fs         = require('fs');
var webpack      = require('webpack');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');


// 读取node_modules列表，放入externals排除这些库不要buildin
const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = [
  // 打包 Web compoments 代码
  {
    context: path.resolve(__dirname, '..'),
    node: {
      __dirname: true
    },
    entry: {
      vendor: ['react', 'react-router', 'redux'],
      css: ['./web/public/sass/main.scss'],
      components: [
        './web/index.js'
      ]
    },
    output: {
      path: path.resolve(__dirname, '../bundle/web/public/bundle'),
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/bundle/',
      sourceMapFilename: 'map/[file].map'
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        },
        'API_SERVER': JSON.stringify('http://localhost:8081')
      }),
    ],
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
    }
  },

  // 打包 Web Server 代码
  {
    target: 'node',

    context: path.resolve(__dirname, '..'),
    node: {
      __dirname: true
    },

    entry: {
      'webserver' : ['./web/server.js']
    },

    output: {
      path: path.resolve(__dirname, '../bundle/web'),
      filename: '[name].bundle.js'
    },

    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },

    resolve: {
      extensions: ['.js', 'jsx']
    },

    externals: nodeModules,

    plugins: [
      // optimizations
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        },
        __DEVELOPMENT__: false
      })
    ]
  },

  // 打包 api Server 代码
  {
    target: 'node',

    context: path.resolve(__dirname, '..'),
    node: {
      __dirname: true
    },

    entry: {
      'apiserver' : ['./api/apiserver.js']
    },

    output: {
      path: path.resolve(__dirname, '../bundle/api'),
      filename: '[name].bundle.js'
    },

    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },

    resolve: {
      extensions: ['.js', 'jsx']
    },

    externals: nodeModules,

    plugins: [
      // optimizations
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        },
        __DEVELOPMENT__: false
      })
    ]
  }
]
