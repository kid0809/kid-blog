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
        <span><Link to={{ pathname: '/login' }}>login</Link></span>
        <span><Link to={{ pathname: '/reg' }}>register</Link></span>
      </nav>
    )
  }
}


export default Nav
