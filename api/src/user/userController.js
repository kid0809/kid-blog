'use strict'

import _ from 'lodash'
import User from './userModel'


module.exports = {
  /*******************************************
   * 用户注册
   *******************************************/
  regist: (req, res) => {
    const newUser = {
      loginName: _.trim(req.body.loginName),
      password: _.trim(req.body.password),
      displayName: _.trim(req.body.displayName),
      avatar: _.trim(req.body.avatar),
      gender: _.trim(req.body.gender),
      creatAt: new Date(),
      updateAt: new Date()
    }

    User.create(newUser, (err, data) => {
      if(err) return console.log(err)
      res.json(data)
    })
  }
}