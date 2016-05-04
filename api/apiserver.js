'use strict';

import path    from 'path'
import http    from 'http'
import express from 'express'
import config  from '../config/config'
import mongoose from 'mongoose'

const uri = `mongodb://localhost/${config.db}`
global.db = mongoose.createConnection(uri)

const app = module.exports = express()

const env     = process.env.NODE_ENV || 'development'
const apiport = process.env.PORT || config.apiport || 3000
app.set('env', env)
app.set('port', apiport)

require('./server/express')(app, env, config)

require('./server/api-routes')(express, env, app)

http.createServer(app).listen(apiport, (err) => {
  console.info(`==> 🌐  ${config.name} Server started on port ${apiport}, env=${env}`)
})