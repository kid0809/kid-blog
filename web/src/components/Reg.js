import React from 'react'

/* global API_SERVER */

class Reg extends React.Component {
  constructor(props) {
    super(props)
  }

  clickHandle() {
    const loginName = this.refs.loginname.value
    const displayName = this.refs.displayname.value
    const password = this.refs.password.value
    const password2 = this.refs.password2.value
    const avatar = this.refs.avatar.value
    const email = this.refs.email.value
    const gender = this.refs.gender.value
    const code = this.refs.code.value

    if (password !== password2) {
      console.log('两次密码输入不一致')
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
      credentials: 'include'
    })
      .then((res) => {
        return res.json()
      })
      .then((success) => { console.log(JSON.stringify(success)) })
      .catch((error) => {
        console.log('request failed', error)
      })
  }

  render() {
    return (
      <div>
        登陆名：<input type="text" ref="loginname" />
        <br />
        昵称：<input type="text" ref="displayname" />
        <br />
        密码： <input type="password" ref="password" />
        <br />
        确认密码： <input type="password" ref="password2" />
        <br />
        头像： <input type="text" ref="avatar" />
        <br />
        邮箱： <input type="text" ref="email" />
        <br />
        注册码： <input type="text" ref="code" />
        <br />
        性别：
        <select ref="gender">
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
        <br />
        <button onClick={this.clickHandle.bind(this)}>注册</button>
      </div>
    )
  }
}


export default Reg
