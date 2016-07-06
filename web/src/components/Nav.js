import React from 'react'
import { Link } from 'react-router'
import { logout } from '../actions'
import { checkStatus, parseJSON } from '../utils/fetch'

/* global API_SERVER */

class Nav extends React.Component {
  constructor(props) {
    super(props)
  }

  logout(event) {
    event.preventDefault()
    const { dispatch } = this.props

    fetch(`${API_SERVER}/api/logout`, {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => checkStatus(res))
      .then((res) => parseJSON(res))
      .then((success) => {
        console.log(JSON.stringify(success))
        sessionStorage.removeItem('user')
        dispatch(logout())
      })
      .catch((error) => {
        console.log('request failed', error)
      })
  }

  renderNotLogin() {
    return (
      <nav>
        <span><Link to={{ pathname: '/home' }}>home</Link></span>
        <span><Link to={{ pathname: '/login' }}>login</Link></span>
        <span><Link to={{ pathname: '/reg' }}>register</Link></span>
      </nav>
    )
  }

  renderLogin() {
    return (
      <nav>
        <span><Link to={{ pathname: '/home' }}>home</Link></span>
        <span ><a href="#" onClick={this.logout.bind(this)}>loginOut</a></span>
        <span><Link to={{ pathname: '/post' }}>post</Link></span>
      </nav>
    )
  }

  render() {
    const { islogin } = this.props
    return (
      islogin ? this.renderLogin() : this.renderNotLogin()
    )
  }
}


export default Nav
