import _ from 'lodash'
import * as Types from '../constants/ActionTypes'
import jwtDecode from 'jwt-decode'

export default (state = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
}, action) => {
  switch (action.type) {
    case Types.LOGIN_USER_REQUEST:
      return _.assign({}, state, {
        isAuthenticating: true,
        statusText: null
      })

    case Types.LOGIN_USER_SUCCESS:
      return _.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        userName: jwtDecode(action.payload.token).displayName,
        statusText: 'You have been successfully logged in.'
      })

    case Types.LOGIN_USER_FAILURE:
      return _.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
      })

    case Types.USER_LOGOUT:
      return _.assign({}, state, {
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: 'You have been successfully logged out.'
      })

    default:
      return state
  }
}
