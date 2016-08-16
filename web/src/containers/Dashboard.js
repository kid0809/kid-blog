import React from 'react'
import { connect } from 'react-redux'
import Nav from '../components/Nav'
import Header from '../components/Header'
import classNames from 'classnames'
import 'rc-select/assets/index.css'

/* global API_SERVER */

class Dashboard extends React.Component {
  render() {
    const { user, dispatch, article } = this.props
    const { isAuthenticated, token } = user
    const style = classNames({ 'main-wrapper': true }, { 'nav-left': isAuthenticated })
    return (
      <div>
        <Header isAuthenticated={isAuthenticated} dispatch={dispatch} token={token} />
        {isAuthenticated ? <Nav /> : null}
        <div className={style}>
          {this.props.children && React.cloneElement(this.props.children, {
            dispatch,
            token,
            article
          })}
        </div>
      </div>
    )
  }
}


// Redux 回传值
function mapStateToProps(state) {
  const { user, article } = state

  return { user, article }
}

export default connect(mapStateToProps)(Dashboard)

