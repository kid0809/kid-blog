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
      gender: _.trim(req.body.gender)
    }

    User.create(newUser, (err, data) => {
      if(err) return console.log(err)
      res.json(data)
    })
  },

  /*******************************************
   * 用户登录
   *******************************************/
  login: (req, res) => {
    const key = config.secret
    const loginName = _.trim(req.body.loginName)
    const passwordhash = crypto.createHmac('sha1', key).update(_.trim(req.body.password)).digest('hex')


    User.find({ loginName: loginName, password: passwordhash }, (err, data) => {
      if(err) return console.log(err)
      data[0].password = ''
      res.json(data)
    })
  }
}