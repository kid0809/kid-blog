import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import configureStore from './src/store/configureStore'
import DevTools from './src/containers/DevTools'
import { loginUserSuccess } from './src/actions'


const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS()
  }
})

const token = sessionStorage.getItem('token')
if (token !== null) {
  store.dispatch(loginUserSuccess(token))
}

render(
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      {process.env.NODE_ENV === 'production' ? null : <DevTools />}
    </div>
  </Provider>,
  document.getElementById('root')
)
