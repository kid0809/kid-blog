import React from 'react'
import { Link } from 'react-router'
import { logout } from '../actions'
import { checkStatus, parseJSON } from '../utils/fetch'

/* global API_SERVER */

class Nav extends React.Component {
  render() {
    const { islogin } = this.props
    return (
      <nav>
        <div className="user-wrap">
          <img src="images/default.jpg" alt="" className="user-avatar" />
        </div>
      </nav>
    )
  }
}


export default Nav
