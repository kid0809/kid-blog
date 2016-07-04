import React from 'react'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div>
        用户名：<input type="text" />
        <br />
        密码： <input type="password" />
        <br />
        <button>登陆</button>
      </div>
    )
  }
}


export default Login
