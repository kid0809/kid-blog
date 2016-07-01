import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import configureStore from './src/store/configureStore'
import DevTools from './src/containers/DevTools'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
)
