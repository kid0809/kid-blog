'use strict'

import React from 'react'
import { Route } from 'react-router'
import Dashboard from './src/containers/Dashboard'

import Home from './src/components/Home'
import Login from './src/components/Login'
import Reg from './src/components/Reg'
import Post from './src/components/Post'


function isLogin(nextState, replaceState) {
  if (!!window.localStorage.token && nextState.location.pathname.match('/dashboard')) {
    replaceState('/home')
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
  <Route path="/" component={Dashboard}>
    <Route path="/home" component={Home} onEnter={requireLogin} />
    <Route path="/dashboard" component={Login} onEnter={isLogin} />
    <Route path="/reg" component={Reg} onEnter={requireLogin} />
    <Route path="/post" component={Post} onEnter={requireLogin} />
  </Route>
)
