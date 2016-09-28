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
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: 'style-loader!css-loader!postcss-loader!sass-loader?browsers=last 2 version'
        },

        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
      ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    resolve: {
      extensions: ['', '.js']
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
      extensions: ['', '.js']
    },

    externals: nodeModules,

    plugins: [
      // optimizations
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true),
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
      'webserver' : ['./api/apiserver.js']
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
      extensions: ['', '.js']
    },

    externals: nodeModules,

    plugins: [
      // optimizations
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true),
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
