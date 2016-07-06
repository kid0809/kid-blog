import React from 'react'
import { connect } from 'react-redux'
import Nav from '../components/Nav'
import { checkStatus, parseJSON } from '../utils/fetch'
import 'isomorphic-fetch'
import { login } from '../actions'

/* global API_SERVER */

class Dashboard extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props

    fetch(`${API_SERVER}/api/isLogin`, {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => checkStatus(res))
      .then((res) => parseJSON(res))
      .then((success) => {
        console.log(JSON.stringify(success))
        dispatch(login())
      })
      .catch((error) => {
        console.log('request failed', error)
      })
  }

  render() {
    const { user, dispatch } = this.props
    const { islogin } = user
    return (
      <div className="main-wrapper">
        <Nav islogin={islogin} dispatch={dispatch} />
        {this.props.children && React.cloneElement(this.props.children, {
          dispatch: dispatch
        })}
      </div>
    )
  }
}


// Redux 回传值
function mapStateToProps(state) {
  const { user } = state

  return { user }
}

export default connect(mapStateToProps)(Dashboard)

