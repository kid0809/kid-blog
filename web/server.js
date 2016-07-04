import path    from 'path'
import express from 'express'
import errorhandler from 'errorhandler'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../config/dev.webpack.config'

const app = express()
const port = 8080

const env = process.env.NODE_ENV || 'development'
app.set('env', env)

/**
 * 用于指定URL路径和服务器路径的映射
 */
const publicDir = path.resolve(__dirname, '../public')
app.use('/', express.static(publicDir))


/**
 * 判断运行环境,执行不同动作
 */
if (env === 'development') {
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
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
