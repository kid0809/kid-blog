import React from 'react'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { logout } from '../actions'
import { checkStatus, parseJSON } from '../utils/fetch'

/* global API_SERVER */

class Header extends React.Component {
  logout(event) {
    event.preventDefault()
    const { dispatch } = this.props

    fetch(`${API_SERVER}/api/logout`, {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => checkStatus(res))
      .then((res) => parseJSON(res))
      .then(() => {
        sessionStorage.removeItem('user')
        dispatch(logout())
        dispatch(push('/home'))
      })
      .catch((error) => {
        console.log('request failed', error)
      })
  }

  renderNotLogin() {
    return (
      <ul>
        <li><Link to={{ pathname: '/home' }} activeStyle={{ color: '#6556e2' }}>主页</Link></li>
        <li><Link to={{ pathname: '/login' }} activeStyle={{ color: '#6556e2' }}>登录</Link></li>
      </ul>
    )
  }

  renderLogin() {
    return (
      <ul>
        <li><Link to={{ pathname: '/home' }} activeStyle={{ color: '#6556e2' }}>主页</Link></li>
        <li><Link to={{ pathname: '/reg' }} activeStyle={{ color: '#6556e2' }}>注册</Link></li>
        <li><Link to={{ pathname: '/post' }} activeStyle={{ color: '#6556e2' }}>发布</Link></li>
        <li><a href="#" onClick={this.logout.bind(this)}>登出</a></li>
      </ul>
    )
  }

  render() {
    const { islogin } = this.props
    return (
      <header className="header">
        <div className="logo">
          kid's blog 后台管理系统
        </div>
        <div className="menu">
          {islogin ? this.renderLogin() : this.renderNotLogin()}
        </div>
      </header>
    )
  }
}


export default Header
