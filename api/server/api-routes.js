'use strict'

import User from '../src/user/userController'
import Article from '../src/article/articleController'
import jwt from 'jsonwebtoken'
import expressJWT from 'express-jwt'
import config from '../../config/config'

module.exports = (express, env, app) => {

  const router = express.Router()

  router
    .post('/regist', User.regist)
    .post('/login', User.login)
    .get('/logout', expressJWT({secret: config.secret}), User.logout)

  router
    .get('/article/all', Article.articleList)
    .post('/article/create', expressJWT({secret: config.secret}), Article.createArticle)
    .put('/article', expressJWT({secret: config.secret}), Article.updateArticle)
    .put('/article/publish', expressJWT({secret: config.secret}), Article.updatePublish)
    .delete('/article', expressJWT({secret: config.secret}), Article.removeArticle)

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
