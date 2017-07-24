'use strict'

import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import Dashboard from './src/containers/Dashboard'
import App from './src/containers/App'

// import Home from './src/components/Home'
import FrontHome from './src/components/FrontHome'
import Blog from './src/components/Blog'

const Home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./src/components/Home').default)
  }, 'home')
}

const Login = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./src/components/Login').default)
  }, 'login')
}

const Reg = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./src/components/Reg').default)
  }, 'reg')
}

const Post = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./src/components/Post').default)
  }, 'post')
}

const UpdateArticle = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./src/components/UpdateArticle').default)
  }, 'update')
}


const Article = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./src/components/Article').default)
  }, 'article')
}

// import Login from './src/components/Login'
// import Reg from './src/components/Reg'
// import Post from './src/components/Post'
// import UpdateArticle from './src/components/UpdateArticle'
// import Article from './src/components/Article'



function isLogin(nextState, replaceState) {
  if (!!window.sessionStorage.token && nextState.location.pathname.match('/dashboard')) {
    replaceState('/dashboard/home')
  }
}

function requireLogin(nextState, replace) {
  if (!window.sessionStorage.token) {
    replace({
      pathname: '/dashboard',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
  <Route path="/">
    {/* <IndexRedirect to="home" />
    <Route path="home" component={App}>
      <IndexRoute component={FrontHome} />
      <Route path="blogs/:id" component={Blog} />
    </Route> */}
    <IndexRedirect to="dashboard" />
    <Route path="dashboard" component={Dashboard}>
      <IndexRedirect to="login" />
      <Route path="login" getComponent={Login} onEnter={isLogin} />
      <Route path="reg" getComponent={Reg} />
      <Route path="home" getComponent={Home} onEnter={requireLogin} />
      <Route path="post" getComponent={Post} onEnter={requireLogin} />
      <Route path="/blog/:id" getComponent={Article} onEnter={requireLogin} />
      <Route path="/update/:id" getComponent={UpdateArticle} onEnter={requireLogin} />
    </Route>
  </Route>
)
