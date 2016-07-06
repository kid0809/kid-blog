import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

export default function configureStore(preloadedState) {
  const middleware = routerMiddleware(browserHistory)
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, middleware, apiMiddleware),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
