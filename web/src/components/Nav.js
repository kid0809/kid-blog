import React from 'react'
import { Link } from 'react-router'


class Nav extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <nav>
        <span><Link to={{ pathname: '/home' }}>home</Link></span>
        <span><a href="/login">login</a></span>
        <span><a href="/reg">register</a></span>
      </nav>
    )
  }
}


export default Nav
