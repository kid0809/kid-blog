'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Dashboard from './src/containers/Dashboard'

import Home from './src/components/Home'

export default (
  <Route path="/" component={Dashboard}>
    <Route path="home" component={Home} />
  </Route>
)
