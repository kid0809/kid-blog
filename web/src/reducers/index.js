// import * as ActionTypes from '../actions'
import { combineReducers } from 'redux-immutable'
import user from './user'
import article from './article'
import routing from './router'

const rootReducer = combineReducers({
  user,
  article,
  routing
})

export default rootReducer
