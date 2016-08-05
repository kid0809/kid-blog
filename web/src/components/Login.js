import React from 'react'
import { checkStatus, parseJSON } from '../utils/fetch'
import { push } from 'react-router-redux'
import { login } from '../actions'

/* global API_SERVER */

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  clickHandle() {
    const { dispatch } = this.props
    const loginname = this.refs.loginname.value
    const password = this.refs.password.value

    const payload = {
      loginName: loginname,
      password: password
    }

    fetch(`${API_SERVER}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    })
      .then((res) => checkStatus(res))
      .then((res) => parseJSON(res))
      .then((success) => {
        console.log(JSON.stringify(success))
        sessionStorage.setItem('user', JSON.stringify(success))
        dispatch(login())
        dispatch(push('/home'))
      })
      .catch((error) => {
        console.log('request failed', error)
      })
  }

  render() {
    return (
      <div>
        用户名：<input type="text" ref="loginname" />
        <br />
        密码： <input type="password" ref="password" />
        <br />
        <button onClick={this.clickHandle.bind(this)}>登陆</button>
      </div>
    )
  }
}


export default Login
