import React from 'react'
import Nav from '../components/Nav'


class Dashboard extends React.Component {

  render() {
    return (
      <div className="main-wrapper">
        <Nav />
        {this.props.children}
      </div>
    )
  }
}


export default Dashboard
