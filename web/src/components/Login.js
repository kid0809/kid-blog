import React from 'react'
import { Form, Input, Button } from 'antd'
import { loginUser } from '../actions'

const FormItem = Form.Item

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
  }

  keyDown(event) {
    const key = event.keyCode
    if (key === 13) {
      this.clickHandle()
    }
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }

    return (
      <div className="login-wrapper">
        <div style={{ width: '400px' }}>
          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label="登录名"
            >
              <Input 
                type="text" 
                placeholder="请输入登录名" 
                value={this.state.loginname} 
                onChange={(event) => { this.setState({ loginname: event.target.value }) }} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
            >
              <Input
                type="password" 
                placeholder="请输入密码" 
                value={this.state.password} 
                onChange={(event) => { this.setState({ password: event.target.value }) }}
                onKeyDown={this.keyDown.bind(this)} />
            </FormItem>

            <FormItem
              wrapperCol={{ span: 4, offset: 6 }}
            >
              <Button type="primary" onClick={this.clickHandle.bind(this)} size="default">登录</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

Login = Form.create()(Login)

export default Login
