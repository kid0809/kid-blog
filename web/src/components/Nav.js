import React from 'react'


class Nav extends React.Component {
  render() {
    return (
      <nav>
        <div className="user-wrap">
          <img src="/images/default.jpg" alt="" className="user-avatar" />
          <div style={{ marginTop: '10px' }}>
            {this.props.user.userName}
          </div>
          <div style={{ marginTop: '10px' }}>
            角色：{this.props.user.role}
          </div>
        </div>
      </nav>
    )
  }
}


export default Nav
