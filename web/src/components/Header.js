import React from 'react'
import { Link } from 'react-router'
import { is } from 'immutable'
import { push } from 'react-router-redux'
import { logout } from '../actions'

/* global API_SERVER */

class Header extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props === nextProps || is(this.props, nextProps)) ||
           !(this.state === nextState || is(this.state, nextState));
  }

  userLogout(event) {
    event.preventDefault()
    const { dispatch } = this.props

    dispatch(logout())
    dispatch(push('/dashboard'))
  }

  renderNotLogin() {
    return (
      <ul>
        <li><Link to={{ pathname: '/dashboard/login' }} activeStyle={{ color: '#6556e2' }}>登录</Link></li>
      </ul>
    )
  }

  renderLogin() {
    return (
      <ul>
        <li><Link to={{ pathname: '/dashboard/home' }} activeStyle={{ color: '#6556e2' }}>主页</Link></li>  
        <li><Link to={{ pathname: '/dashboard/post' }} activeStyle={{ color: '#6556e2' }}>发布</Link></li>
        <li><a onClick={this.userLogout.bind(this)}>登出</a></li>
      </ul>
    )
  }


  render() {
    const { isAuthenticated } = this.props
    return (
      <header className="header">
        <div className="logo">
          kid&apos;s blog 后台管理系统
        </div>
        <div className="menu">
          {isAuthenticated ? this.renderLogin() : this.renderNotLogin()}
        </div>
      </header>
    )
  }
}


export default Header
