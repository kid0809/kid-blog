'use strict'

import crypto from 'crypto'
import _ from 'lodash'
import User from './userModel'
import config from '../../../config/config'


module.exports = {
  /*******************************************
   * 用户注册
   *******************************************/
  regist: (req, res) => {
    const key = config.secret
    const passwordhash = crypto.createHmac('sha1', key).update(_.trim(req.body.password)).digest('hex')

    const newUser = {
      loginName: _.trim(req.body.loginName),
      password: passwordhash,
      displayName: _.trim(req.body.displayName),
      avatar: _.trim(req.body.avatar),
      email: _.trim(req.body.email),
      gender: _.trim(req.body.gender)
    }

    User.findOne({loginName: newUser.loginName}, (err1, user) => {
      if (err1) {
        return res.json(err1)
      }

      if (user) {
        return res.json('登录名已存在')
      }

      User.create(newUser, (err2, data) => {
        if(err2) return res.json(err2)
        req.session.user = data
        res.json(data)
      })
    })
  },

  /*******************************************
   * 用户登录
   *******************************************/
  login: (req, res) => {
    console.log(req.session)
    const key = config.secret
    const loginName = _.trim(req.body.loginName)
    const passwordhash = crypto.createHmac('sha1', key).update(_.trim(req.body.password)).digest('hex')


    User.findOne({ loginName: loginName, password: passwordhash }, (err, data) => {
      if(err) return res.json(err)
      req.session.user = data
      res.json(data)
    })
  },

  /*******************************************
   * 用户登出
   *******************************************/
  logout: (req, res) => {
    if (req.session.user) {
      req.session.user = null
      res.status(200).json('success')
    } else {
      res.status(401).json('error')
    }
  },

  /*******************************************
   * 判断用户是否登录
   *******************************************/
  isLogin: (req, res) => {
    console.log(req.session)
    if (req.session.user) {
      res.status(200).json('success')
    } else {
      res.status(401).json('error')
    }
  }
}