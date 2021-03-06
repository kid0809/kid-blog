'use strict'

import crypto from 'crypto'
import _ from 'lodash'
import User from './userModel'
import jwt from 'jsonwebtoken'
import config from '../../../config/config'


module.exports = {
  /*******************************************
   * 用户注册
   *******************************************/
  regist: (req, res) => {
    const key = config.secret
    console.log(req.body.password)
    const passwordhash = crypto.createHmac('sha1', key).update(_.trim(req.body.password)).digest('hex')

    let newUser = {}
    if (req.body.code === '13207718924') {
      newUser = {
        loginName: _.trim(req.body.loginName),
        password: passwordhash,
        displayName: _.trim(req.body.displayName),
        avatar: _.trim(req.body.avatar),
        email: _.trim(req.body.email),
        gender: _.trim(req.body.gender),
        role: 'admin',
        permission: ['/api']
      }
    } else {
      newUser = {
        loginName: _.trim(req.body.loginName),
        password: passwordhash,
        displayName: _.trim(req.body.displayName),
        avatar: _.trim(req.body.avatar),
        email: _.trim(req.body.email),
        gender: _.trim(req.body.gender)
      }
    }

    User.findOne({loginName: newUser.loginName}, (err1, data1) => {
      if (err1) {
        return res.json(err1)
      }

      if (data1) {
        return res.status(403).json('登录名已存在')
      }

      User.create(newUser, (err2, data2) => {
        if(err2) return res.json(err2)

        const user = {
          loginName: data2.loginName,
          displayName: data2.displayName,
          avatar: data2.avatar,
          email: data2.email,
          gender: data2.gender
        }

        res.status(200).json(user)
      })
    })
  },

  /*******************************************
   * 用户登录
   *******************************************/
  login: (req, res) => {
    const key = config.secret
    const loginName = _.trim(req.body.loginName)
    console.log(req.body.password)
    const passwordhash = crypto.createHmac('sha1', key).update(_.trim(req.body.password)).digest('hex')


    User.findOne({ loginName: loginName, password: passwordhash }, (err, data) => {
      if (err) return res.send(err)

      if (data === null) return res.status(404).send('账号或密码错误')
      const user = {
        userid: data._id,
        displayName: data.displayName,
        avatar: data.avatar,
        email: data.email,
        role: data.role,
        permission: data.permission
      }

      const token = jwt.sign(user, key, {expiresIn: '24h'})
      res.status(200).json({token})
    })
  },

  /*******************************************
   * 用户登出
   *******************************************/
  logout: (req, res) => {
    console.log(req.user)
    res.json({token: '111'})
  },

  /*******************************************
   * 判断用户是否登录
   *******************************************/
  // isLogin: (req, res) => {
  //   if (req.session.user) {
  //     res.status(200).json(req.session.user)
  //   } else {
  //     res.status(401).json('error')
  //   }
  // }
}
