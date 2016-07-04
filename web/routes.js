'use strict'

import React from 'react'
import { Route } from 'react-router'
import Dashboard from './src/containers/Dashboard'

import Home from './src/components/Home'
import Login from './src/components/Login'
import Reg from './src/components/Reg'

export default (
  <Route path="/" component={Dashboard}>
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/reg" component={Reg} />
  </Route>
)
