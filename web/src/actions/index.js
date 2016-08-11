import * as Types from '../constants/ActionTypes'
import { checkStatus, parseJSON } from '../utils/fetch'
// import { CALL_API, getJSON } from 'redux-api-middleware'
import jwtDecode from 'jwt-decode'
import fetch from 'isomorphic-fetch'

/* global API_SERVER */

export function loginUserSuccess(token) {
  localStorage.setItem('token', token)
  return {
    type: Types.LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token')
  return {
    type: Types.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: Types.LOGIN_USER_REQUEST
  }
}

export function loginUser(data) {
  return (dispatch) => {
    dispatch(loginUserRequest())
    return fetch(`${API_SERVER}/api/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(res => {
        console.log(res)
        try {
          const decoded = jwtDecode(res.token)
          dispatch(loginUserSuccess(res.token))
        } catch (err) {
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }))
        }
      })
      .catch(error => {
        dispatch(loginUserFailure(error))
      })
  }
}


export function logout() {
  localStorage.removeItem('token')
  return {
    type: Types.USER_LOGOUT
  }
}
