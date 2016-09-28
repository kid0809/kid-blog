import path    from 'path'
import express from 'express'
import errorhandler from 'errorhandler'
import webpack from 'webpack'


const app = express()
const port = 8080

const env = process.env.NODE_ENV || 'development'
app.set('env', env)

/**
 * 用于指定URL路径和服务器路径的映射
 */
const publicDir = path.resolve(__dirname, './public')
app.use('/', express.static(publicDir))


/**
 * 判断运行环境,执行不同动作
 */
if (env === 'development') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../config/dev.webpack.config')
  // webpack 热更新
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))

  // handle error
  app.locals.pretty = true
  app.use(errorhandler({
    dumpExceptions: true,
    showStack: true
  }))
}


app.use(function(req, res) {
  res.sendFile('index.html', { root: __dirname })
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
