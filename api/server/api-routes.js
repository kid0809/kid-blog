'use strict'

import User from '../src/user/userController'
import jwt from 'jsonwebtoken'
import config from '../../config/config'

module.exports = (express, env, app) => {

  const router = express.Router()

  function loadUser(req, res, next) {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json('该用户未登陆')
    } else {
      const _token = token.replace('Bearer ', '')
      jwt.verify(_token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(500).json('无法获取用户')
        }
        next()
      })
    }
  }

  router.post('/regist', User.regist)
  router.post('/login', User.login)
  router.get('/logout', User.logout)

  // Route not found - set 404
  router.get('*', (req, res) => {
    res.json({
      'route': 'Sorry! This page does not exist!'
    })
  })

  app.use('/api', router)

  // 用户登录中间件校验样例
  // const userRouter = express.Router();
  // app.use('/user', userRouter);
  // userRouter.user(isLogin);
  // userRouter.route('/')
  //   .get((req, res) => {})
  //   .put((req, res) => {})
  //   .post((req, res) => {})
  //   .delete((req, res) => {})
}
