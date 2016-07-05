'use strict'

import User from '../src/user/userController'

module.exports = (express, env, app) => {

  const router = express.Router()

  router.get('/', (req, res) => {
    let sess = req.session
    console.log(sess)
    if (sess.views) {
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + sess.views + '</p>')
      res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      sess.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  })

  router.post('/regist', User.regist)
  router.post('/login', User.login)

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
