import React from 'react'
import { is } from 'immutable'


class Nav extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props === nextProps || is(this.props, nextProps)) ||
           !(this.state === nextState || is(this.state, nextState));
  }

  render() {
    const userName = this.props.user.get('userName')
    const role = this.props.user.get('role')

    return (
      <nav>
        <div className="user-wrap">
          <img src="/images/default.jpg" alt="" className="user-avatar" />
          <div style={{ marginTop: '10px' }}>
            {userName}
          </div>
          <div style={{ marginTop: '10px' }}>
            角色：{role}
          </div>
        </div>
      </nav>
    )
  }
}


export default Nav
