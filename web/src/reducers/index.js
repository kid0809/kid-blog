// import * as ActionTypes from '../actions'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import user from './user'
import article from './article'

const rootReducer = combineReducers({
  user,
  article,
  routing
})

export default rootReducer
