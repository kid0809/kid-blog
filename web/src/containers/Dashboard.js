import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Nav from '../components/Nav'
import Header from '../components/Header'

/* global API_SERVER */

class Dashboard extends React.Component {
  render() {
    const { user, dispatch, article } = this.props
    const isAuthenticated = user.get('isAuthenticated')
    const token = user.get('token')
    const style = classNames({ 'main-wrapper': true }, { 'nav-left': isAuthenticated })

    return (
      <div>
        <Header isAuthenticated={isAuthenticated} dispatch={dispatch} token={token} />
        {isAuthenticated ? <Nav user={user} /> : null}
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
  const article = state.get('article')
  const user = state.get('user')

  return { user, article }
}

export default connect(mapStateToProps)(Dashboard)

