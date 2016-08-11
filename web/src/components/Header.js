import React from 'react'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { logout } from '../actions'

/* global API_SERVER */

class Header extends React.Component {
  userLogout(event) {
    event.preventDefault()
    const { dispatch } = this.props

    dispatch(logout())
    dispatch(push('/dashboard'))

  }

  renderNotLogin() {
    return (
      <ul>
        <li><Link to={{ pathname: '/dashboard' }} activeStyle={{ color: '#6556e2' }}>登录</Link></li>
      </ul>
    )
  }

  renderLogin() {
    return (
      <ul>
        <li><Link to={{ pathname: '/home' }} activeStyle={{ color: '#6556e2' }}>主页</Link></li>
        <li><Link to={{ pathname: '/reg' }} activeStyle={{ color: '#6556e2' }}>注册</Link></li>
        <li><Link to={{ pathname: '/post' }} activeStyle={{ color: '#6556e2' }}>发布</Link></li>
        <li><a href="#" onClick={this.userLogout.bind(this)}>登出</a></li>
      </ul>
    )
  }

  render() {
    const { isAuthenticated } = this.props
    return (
      <header className="header">
        <div className="logo">
          kid's blog 后台管理系统
        </div>
        <div className="menu">
          {isAuthenticated ? this.renderLogin() : this.renderNotLogin()}
        </div>
      </header>
    )
  }
}


export default Header
