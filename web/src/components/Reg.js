import React from 'react'
import { push } from 'react-router-redux'
import { Form, Input, Button, Radio, message } from 'antd'
import { checkStatus, parseJSON } from '../utils/fetch'

const FormItem = Form.Item
const RadioGroup = Radio.Group

/* global API_SERVER */

class Reg extends React.Component {
  constructor(props) {
    super(props)
  }

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form
    if (value) {
      validateFields(['rePasswd'], { force: true })
    }
    callback()
  }

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form
    if (value && value !== getFieldValue('password')) {
      callback('两次输入密码不一致！')
    } else {
      callback()
    }
  }

  clickHandle() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!')
        return
      }

      const { dispatch } = this.props

      fetch(`${API_SERVER}/api/regist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      })
        .then(checkStatus)
        .then(parseJSON)
        .then((success) => { 
          console.log(success)
          message.success('注册成功')
          dispatch(push('/dashboard/login'))
        })
        .catch((error) => {
          console.log('request failed', error)
          message.error('注册失败 登录名已被占用')
          this.props.form.resetFields()
        })
    })
  }

  render() {
    const { getFieldProps } = this.props.form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }

    const loginNameProps = getFieldProps('loginName', {
      rules: [
        { required: true, message: '请填写登录名' }
      ]
    })

    const displayNameProps = getFieldProps('displayName', {
      rules: [
        { required: true, message: '请填写昵称' }
      ]
    })

    const passwdProps = getFieldProps('password', {
      rules: [
        { required: true, message: '请填写密码' },
        { validator: this.checkPass.bind(this) },
      ],
    })

    const rePasswdProps = getFieldProps('rePasswd', {
      rules: [{
        required: true,
        message: '请再次输入密码',
      }, {
        validator: this.checkPass2.bind(this),
      }],
    })

    return (
      <div className="login-wrapper">
        <div style={{ width: '400px' }}>
          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label="登录名">
              <Input type="text" placeholder="请输入登录名" {...loginNameProps} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="昵称">
              <Input type="text" placeholder="请输入昵称" {...displayNameProps} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="密码">
              <Input type="password" placeholder="请输入密码" {...passwdProps} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="确认密码">
              <Input type="password" placeholder="请再输入一次密码" {...rePasswdProps} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="性别"
            >
              <RadioGroup {...getFieldProps('gender', { initialValue: '男' })}>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="邮箱">
              <Input type="text" placeholder="请输入邮箱" {...getFieldProps('email', { initialValue: '' })} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="注册码">
              <Input type="text" placeholder="admin注册码：13207718924" {...getFieldProps('code', { initialValue: '' })} />
            </FormItem>

            <FormItem
              wrapperCol={{ span: 4, offset: 6 }}
            >
              <Button type="primary" onClick={this.clickHandle.bind(this)} size="default">注册</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

Reg = Form.create()(Reg)

export default Reg
