import * as Types from '../constants/ActionTypes'
import { checkStatus, parseJSON } from '../utils/fetch'
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode'
import fetch from 'isomorphic-fetch'
import Notification from 'rc-notification'


const notification = Notification.newInstance()

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

function loginUserFailure(error) {
  localStorage.removeItem('token')
  if (error.response.status === 404) {
    notification.notice({
      content: '账号或密码错误'
    })
  }
  return {
    type: Types.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

function loginUserRequest() {
  return {
    type: Types.LOGIN_USER_REQUEST
  }
}

export function loginUser(data) {
  return (dispatch) => {
    dispatch(loginUserRequest())
    return fetch(`${API_SERVER}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(res => {
        try {
          jwtDecode(res.token)
          dispatch(loginUserSuccess(res.token))
          dispatch(push('/home'))
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
  // fetch(`${API_SERVER}/api/logout`, {
  //   method: 'GET',
  //   credentials: 'include',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`
  //   }
  // })
  // .then(checkStatus)
  // .then(parseJSON)
  // .then(res => {
  //   console.log(res.token)
  // })
  // .catch(err => {
  //   console.log(err)
  // })
}

function articleSuccess(data) {
  return {
    type: Types.ARTICLE_SUCCESS,
    payload: {
      data
    }
  }
}

function articleFailure(error) {
  return {
    type: Types.ARTICLE_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

function articleRequest() {
  return {
    type: Types.ARTICLE_REQUEST
  }
}

export function article() {
  return (dispatch) => {
    dispatch(articleRequest())
    return fetch(`${API_SERVER}/api/article/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(res => {
        dispatch(articleSuccess(res.data))
      })
      .catch(error => {
        dispatch(articleFailure(error))
      })
  }
}

