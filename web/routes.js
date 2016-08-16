'use strict'

import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import Dashboard from './src/containers/Dashboard'
import App from './src/containers/App'

import Home from './src/components/Home'
import Login from './src/components/Login'
import Reg from './src/components/Reg'
import Post from './src/components/Post'


function isLogin(nextState, replaceState) {
  if (!!window.localStorage.token && nextState.location.pathname.match('/dashboard')) {
    replaceState('/dashboard/home')
  }
}

function requireLogin(nextState, replace) {
  if (!window.localStorage.token) {
    replace({
      pathname: '/dashboard',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
  <Route path="/">
    <IndexRoute component={App} />
    <Route path="dashboard" component={Dashboard}>
      <IndexRedirect to="login" />
      <Route path="login" component={Login} onEnter={isLogin} />
      <Route path="reg" component={Reg} />
      <Route path="home" component={Home} onEnter={requireLogin} />
      <Route path="post" component={Post} onEnter={requireLogin} />
    </Route>
  </Route>
)
