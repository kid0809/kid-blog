import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
  const middleware = routerMiddleware(browserHistory)
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, middleware, apiMiddleware)
  )
}
