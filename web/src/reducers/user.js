import Immutable from 'immutable'
import * as Types from '../constants/ActionTypes'
import jwtDecode from 'jwt-decode'

const initialState = Immutable.fromJS({
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_USER_REQUEST:
      return state.merge({
        isAuthenticating: true,
        statusText: null
      })

    case Types.LOGIN_USER_SUCCESS:
      return state.merge({
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        userName: jwtDecode(action.payload.token).displayName,
        role: jwtDecode(action.payload.token).role,
        statusText: 'You have been successfully logged in.'
      })

    case Types.LOGIN_USER_FAILURE:
      return state.merge({
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
      })

    case Types.USER_LOGOUT:
      return state.merge({
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: 'You have been successfully logged out.'
      })

    default:
      return state
  }
}
