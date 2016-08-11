import React from 'react'
import { checkStatus, parseJSON } from '../utils/fetch'
import { push } from 'react-router-redux'
import { loginUser } from '../actions'
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap'

/* global API_SERVER */

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginname: '',
      password: ''
    }
  }

  clickHandle() {
    const { dispatch } = this.props
    const loginname = this.state.loginname
    const password = this.state.password

    const payload = {
      loginName: loginname,
      password: password
    }

    dispatch(loginUser(payload))
    // fetch(`${API_SERVER}/api/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(payload),
    //   credentials: 'include'
    // })
    //   .then((res) => checkStatus(res))
    //   .then((res) => parseJSON(res))
    //   .then((success) => {
    //     console.log(JSON.stringify(success))
    //     sessionStorage.setItem('user', JSON.stringify(success))
    //     dispatch(login())
    //     dispatch(push('/home'))
    //   })
    //   .catch((error) => {
    //     console.log('request failed', error)
    //   })
  }

  render() {
    return (
      <div className="login-wrapper">
        <div style={{ width: '400px' }}>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={3}>
                用户名
              </Col>
              <Col sm={9}>
                <FormControl type="text" placeholder="用户名" value={this.state.loginname} onChange={(event) => this.setState({ loginname: event.target.value })} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={3}>
                密码
              </Col>
              <Col sm={9}>
                <FormControl type="password" placeholder="密码" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={3} sm={9}>
                <Button onClick={this.clickHandle.bind(this)}>
                  登录
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }
}


export default Login
