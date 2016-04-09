'use strict'


module.exports = (express, env, app) => {

  const router = express.Router()

  router.get('/', (req, res) => {
    res.send('hello world')
  })

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
