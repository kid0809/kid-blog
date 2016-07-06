import * as Types from '../constants/ActionTypes'
// import { CALL_API, getJSON } from 'redux-api-middleware'

export function login() {
  return {
    type: Types.LOGIN
  }
}

export function logout() {
  return {
    type: Types.LOGOUT
  }
}
