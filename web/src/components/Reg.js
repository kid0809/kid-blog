import React from 'react'
import { push } from 'react-router-redux'
import Select, { Option } from 'rc-select'
import Notification from 'rc-notification'
import { checkStatus, parseJSON } from '../utils/fetch'
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap'

const notification = Notification.newInstance()

/* global API_SERVER */

class Reg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginname: '',
      displayname: '',
      password: '',
      password2: '',
      avatar: '',
      email: '',
      gender: '男',
      code: ''
    }
  }

  clickHandle() {
    const { dispatch } = this.props
    const loginName = this.state.loginname
    const displayName = this.state.displayname
    const password = this.state.password
    const password2 = this.state.password2
    const avatar = this.state.avatar
    const email = this.state.email
    const gender = this.state.gender
    const code = this.state.code

    if (password !== password2) {
      notification.notice({
        content: '两次密码输入不一致'
      })

      return
    }
    
    const payload = {
      loginName,
      displayName,
      password,
      avatar,
      email,
      gender,
      code
    }

    fetch(`${API_SERVER}/api/regist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((success) => { 
        console.log(success)
        notification.notice({
          content: '注册成功'
        })
        dispatch(push('/dashboard/login'))
      })
      .catch((error) => {
        console.log('request failed', error)
        notification.notice({
          content: '注册失败'
        })
        this.setState({
          loginname: '',
          displayname: '',
          password: '',
          password2: '',
          avatar: '',
          email: '',
          gender: '男',
          code: ''
        })
      })
  }

  render() {
    return (
      <div className="login-wrapper">
        <div style={{ width: '400px' }}>
          <Form horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                登录名
              </Col>
              <Col sm={9}>
                <FormControl 
                  type="text"
                  placeholder="登录名"
                  value={this.state.loginname} 
                  onChange={(event) => this.setState({ loginname: event.target.value })} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                昵称
              </Col>
              <Col sm={9}>
                <FormControl
                  type="text" 
                  placeholder="昵称" 
                  value={this.state.displayname} 
                  onChange={(event) => this.setState({ displayname: event.target.value })} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                密码
              </Col>
              <Col sm={9}>
                <FormControl
                  type="password"
                  placeholder="密码"
                  value={this.state.password} 
                  onChange={(event) => this.setState({ password: event.target.value })} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                确认密码
              </Col>
              <Col sm={9}>
                <FormControl
                  type="password"
                  placeholder="再输入一次密码"
                  value={this.state.password2} 
                  onChange={(event) => this.setState({ password2: event.target.value })} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                头像
              </Col>
              <Col sm={9}>
                <FormControl
                  type="text" 
                  placeholder="头像" 
                  value={this.state.avatar} 
                  onChange={(event) => this.setState({ avatar: event.target.value })} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                邮箱
              </Col>
              <Col sm={9}>
                <FormControl 
                  type="text"
                  placeholder="请输入邮箱" 
                  value={this.state.email} 
                  onChange={(event) => this.setState({ email: event.target.value })} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                注册码
              </Col>
              <Col sm={9}>
                <FormControl
                  type="text" 
                  placeholder="admin注册码 13207718924" 
                  value={this.state.code} 
                  onChange={(event) => this.setState({ code: event.target.value })} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                性别
              </Col>
              <Col sm={9}>
                <Select
                  value={this.state.gender}
                  style={{ width: '100%' }}
                  onChange={(value) => this.setState({ gender: value })}
                >
                  <Option key="0" value="男">男</Option>
                  <Option key="1" value="女">女</Option>
                </Select>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={3} sm={9}>
                <Button onClick={this.clickHandle.bind(this)}>
                  注册
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }
}

export default Reg
