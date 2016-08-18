import * as Types from '../constants/ActionTypes'
import { checkStatus, parseJSON } from '../utils/fetch'
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode'
import fetch from 'isomorphic-fetch'
import { message } from 'antd'


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
    message.error('账号或密码错误')
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
          dispatch(push('/dashboard/home'))
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

function publishSuccess(data) {
  message.success('发布状态改变')
  return {
    type: Types.PUBLISH_ARTICLE_SUCCESS,
    payload: {
      id: data.id,
      publish: data.publish
    }
  }
}

function publishFailure(error) {
  if (error.response.status === 401) {
    message.error('没有权限修改发布状态')
  } else {
    message.error('服务器错误')
  }

  return {
    type: Types.PUBLISH_ARTICLE_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

function publishRequest() {
  return {
    type: Types.PUBLISH_ARTICLE_REQUEST
  }
}

export function publishArticle(data, token) {
  return (dispatch) => {
    dispatch(publishRequest())
    return fetch(`${API_SERVER}/api/article/publish`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(() => {
        dispatch(publishSuccess(data))
      })
      .catch(error => {
        dispatch(publishFailure(error))
      })
  }
}


function deleteArticleSuccess(id) {
  message.success('删除文章成功')
  return {
    type: Types.DELETE_ARTICLE_SUCCESS,
    payload: {
      id
    }
  }
}

function deleteArticleFailure(error) {
  if (error.response.status === 401) {
    message.error('没有权限删除文章')
  } else {
    message.error('服务器错误')
  }

  return {
    type: Types.DELETE_ARTICLE_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

function deleteArticleRequest() {
  return {
    type: Types.DELETE_ARTICLE_REQUEST
  }
}

export function deleteArticle(id, token) {
  return (dispatch) => {
    dispatch(deleteArticleRequest())
    return fetch(`${API_SERVER}/api/article`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(() => {
        dispatch(deleteArticleSuccess(id))
      })
      .catch(error => {
        dispatch(deleteArticleFailure(error))
      })
  }
}
