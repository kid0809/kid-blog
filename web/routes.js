'use strict'

import React from 'react'
import { Route } from 'react-router'
import Dashboard from './src/containers/Dashboard'

import Home from './src/components/Home'
import Login from './src/components/Login'
import Reg from './src/components/Reg'
import Post from './src/components/Post'


function isLogin(nextState, replaceState) {
  if (!!window.sessionStorage.user && nextState.location.pathname.match('/login')) {
    replaceState('/')
  }
}

function requireLogin(nextState, replace) {
  if (!window.sessionStorage.user) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
  <Route path="/" component={Dashboard}>
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} onEnter={isLogin} />
    <Route path="/reg" component={Reg} />
    <Route path="/post" component={Post} onEnter={requireLogin} />
  </Route>
)
