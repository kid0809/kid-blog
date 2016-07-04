'use strict'

import express      from 'express'
import http         from 'http'
import path         from 'path'
import cm           from 'connect-multiparty'
import bodyParser   from 'body-parser'
import morgan       from 'morgan'
import compression  from 'compression'
import errorhandler from 'errorhandler'
import cookieParser from 'cookie-parser'
import session      from 'express-session'

module.exports = (app, env, config) => {
	app.use(cookieParser())

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
  }))

  // body parse
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
  }))
  app.use(bodyParser.json({
    limit: '10mb'
  }))

  app.use(morgan('combined', {
    skip: function(req, res) {
      return res.statusCode < 400
    }
  }));

  app.use(cm())

  app.use(compression({
    threshhold: 512
  }, (req, res) => {
    return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
  }, {
    level: 9
  }))

  // Cross-Domain Allow Security
  app.use((req, res, next) => {
    // console.log(req.headers.origin);
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Headers", "Content-Type")
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
    return
  })


  if (env === 'development') {
    // other
    app.locals.pretty = true;
    app.use(errorhandler({
      dumpExceptions: true,
      showStack: true
    }))
  }

  if (env === 'production') {
    app.use(errorhandler())
  }
}